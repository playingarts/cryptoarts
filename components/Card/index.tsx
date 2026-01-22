import {
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Text from "../Text";
import AR from "../Icons/AR";
import { Props as PaletteProps } from "../Pages/Deck/DeckPaletteContext";
import { breakpoints } from "../../source/enums";
import { useSize } from "../SizeProvider";
import { theme } from "../../styles/theme";
import { usePaletteHook } from "../../hooks/usePaletteHook";
import CardFav from "./CardFav";
import { cardSizes, cardSizesHover, CardSize } from "./sizes";
import { setNavigationCard } from "../Pages/CardPage/navigationCardStore";

const slowTransitionOpacity = theme.transitions.slow("opacity");

export interface CardProps extends HTMLAttributes<HTMLElement> {
  card: GQL.Card;
  ar?: boolean;
  size?: CardSize;
  noArtist?: boolean;
  interactive?: boolean;
  animated?: boolean;
  /** When true, video plays automatically on page load (for card page hero) */
  autoPlayVideo?: boolean;
  noLink?: boolean;
  /** @deprecated Favorites on card hover is now disabled */
  noFavorite?: boolean;
  palette?: PaletteProps["palette"];
  priority?: boolean;
  /** When true, shows gradient placeholder without loading the image (for progressive loading) */
  noImage?: boolean;
  /** URL for artist name link - when provided, artist name becomes a link */
  artistHref?: string;
}

/**
 * Card component for displaying artist cards with hover effects and video
 */
const Card: FC<CardProps> = memo(
  ({
    card,
    size = "small",
    ar = false,
    noArtist = false,
    interactive = true,
    animated = false,
    autoPlayVideo = false,
    noLink = false,
    palette: paletteProp,
    priority = false,
    noImage = false,
    artistHref,
    ...props
  }) => {
    // Compute imgSrc first for use in state initialization
    // Use hi-res images for "big" and "hero" sizes, lower-res for smaller sizes
    // Always use original URL for GIFs (no lower-res version exists)
    const useHiRes = size === "big" || size === "hero";
    const isGif = card.img.endsWith(".gif");
    const imgSrc = useHiRes || isGif ? card.img : card.img.replace("-big-hd/", "-big/");

    // Track loaded state - always start false to ensure consistent SSR/client hydration
    const [loaded, setLoaded] = useState(false);

    const [hover, setHover] = useState(false);
    const [{ x, y }, setSkew] = useState({ x: 0, y: 0 });
    const [videoReady, setVideoReady] = useState(false);

    const hideLoader = useCallback(() => setLoaded(true), []);
    const handleMouseEnter = useCallback(() => setHover(true), []);
    const handleMouseLeave = useCallback(() => setHover(false), []);
    const handleVideoCanPlay = useCallback(() => setVideoReady(true), []);

    const wrapper = useRef<HTMLDivElement>(null);
    const video = useRef<HTMLVideoElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    // Ref callback to store img reference - actual load check happens in useEffect
    const imgRefCallback = useCallback((img: HTMLImageElement | null) => {
      imgRef.current = img;
    }, []);

    // Check if image is already loaded after mount
    // This is critical for page refresh when images are cached
    useEffect(() => {
      const img = imgRef.current;
      if (!img || loaded) return;

      // Check immediately
      if (img.complete && img.naturalWidth > 0) {
        setLoaded(true);
        return;
      }

      // Also check after a frame in case browser is still processing
      const rafId = requestAnimationFrame(() => {
        if (img.complete && img.naturalWidth > 0) {
          setLoaded(true);
        }
      });

      return () => cancelAnimationFrame(rafId);
    }, [loaded]);

    const handleMouseMove = useCallback(
      ({ clientX, clientY }: React.MouseEvent) => {
        if (!wrapper.current) {
          return;
        }
        const { left, width, top, height } =
          wrapper.current.getBoundingClientRect();
        setSkew({
          x: (clientX - left) / width - 0.5,
          y: (clientY - top) / height - 0.5,
        });
      },
      []
    );

    const { width } = useSize();
    const { palette } = usePaletteHook(paletteProp);

    // Consolidated video playback control - handles hover, animated, and autoPlay modes
    // This replaces multiple separate effects to prevent race conditions
    useLayoutEffect(() => {
      const videoElement = video.current;
      if (!videoElement || !card.video) {
        return;
      }

      const videoSrc = card.video;
      // Play video if: animated (popup), autoPlayVideo (card page), or hover (card list)
      // For autoPlayVideo, defer until image is loaded to not compete with LCP
      const shouldPlay = animated || (autoPlayVideo && loaded) || hover;

      // Helper to play video when ready
      const playWhenReady = () => {
        videoElement.play().then(() => {
          setVideoReady(true);
        }).catch(() => {
          // Browser blocked autoplay - video stays hidden, image remains visible
        });
      };

      // Reset if source changed (compare full URLs, not just filenames)
      if (videoElement.src && videoElement.src !== videoSrc) {
        videoElement.pause();
        videoElement.currentTime = 0;
        setVideoReady(false);
        videoElement.src = videoSrc;
      }

      if (!shouldPlay) {
        videoElement.pause();
        videoElement.currentTime = 0;
        setVideoReady(false);
        return;
      }

      // Ensure correct source is set
      if (!videoElement.src || videoElement.src !== videoSrc) {
        videoElement.src = videoSrc;
      }

      // Check if video can already play
      if (videoElement.readyState >= 3) {
        // HAVE_FUTURE_DATA or higher - can play now
        playWhenReady();
      } else {
        // Need to wait for data to load
        videoElement.preload = "auto";
        videoElement.addEventListener("canplay", playWhenReady, { once: true });
        videoElement.load();
      }

      // Cleanup: remove event listener if component updates before canplay fires
      return () => {
        videoElement.removeEventListener("canplay", playWhenReady);
      };
    }, [hover, animated, autoPlayVideo, card.video, loaded]);

    // Cleanup video source only on unmount to prevent memory leaks
    useEffect(() => {
      const videoElement = video.current;
      return () => {
        if (videoElement) {
          videoElement.pause();
          videoElement.src = "";
          videoElement.load();
        }
      };
    }, []);

    return (
      <div
        suppressHydrationWarning
        css={[
          {
            width: cardSizesHover[size].width,
          },
        ]}
        {...props}
      >
        <div
          css={[
            {
              position: "relative",
              height: cardSizesHover[size].height,
              cursor: "pointer",
            },
          ]}
          style={
            (width >= breakpoints.md &&
              hover &&
              interactive && {
                transition: "initial",
                transform: `perspective(${cardSizesHover[size].width}px) rotateX(${
                  -y * 10
                }deg) rotateY(${x * 10}deg) scale3d(1, 1, 1)`,
              }) ||
            undefined
          }
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...(interactive && {
            onMouseMove: handleMouseMove,
          })}
          ref={wrapper}
        >
          <div
            css={(theme) => [
              {
                width: cardSizes[size].width,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                aspectRatio: "0.7076923076923077",
                position: "relative",
                transitionTimingFunction: "linear",
                transitionDuration: "50ms",
                transitionProperty: "scale",
                transition: theme.transitions.fast(["width", "height"]),
              },
            ]}
            style={(hover && { width: cardSizesHover[size].width }) || {}}
          >
            <div
              css={[
                {
                  overflow: "hidden",
                  borderRadius: size === "nano" ? 10 : 15,
                  background:
                    palette === "dark"
                      ? "linear-gradient(45deg, #2d2d2d 0%, #181818 50%, #2d2d2d 100%)"
                      : "linear-gradient(45deg, #d6d6d6 0%, #ffffff 50%, #d6d6d6 100%)",
                  position: "relative",
                  height: "100%",
                  zIndex: 1,
                },
              ]}
            >
              {/* Only render img when noImage is false - prevents image loading */}
              {!noImage && (
                <img
                  ref={imgRefCallback}
                  src={imgSrc}
                  key={imgSrc + "card" + size}
                  css={[
                    {
                      width: "100%",
                      height: "100%",
                      lineHeight: 1,
                      transition: slowTransitionOpacity,
                    },
                  ]}
                  style={{
                    opacity: loaded ? 1 : 0,
                  }}
                  loading={priority ? "eager" : "lazy"}
                  {...(priority && { fetchPriority: "high" })}
                  onLoad={hideLoader}
                  alt={card.artist?.name ? `Card by ${card.artist.name}` : "Playing Arts card"}
                />
              )}
              {!noImage && card.video && (!animated ? width >= breakpoints.sm : true) && (
                <video
                  loop
                  muted
                  playsInline
                  ref={video}
                  css={(theme) => [
                    {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      overflow: "hidden",
                      width: "100%",
                      height: "100%",
                      lineHeight: 1,
                      borderRadius: theme.spacing(1.5),
                      transition: slowTransitionOpacity,
                      // Desktop: show video when animated, autoPlayVideo, or hovering (all require videoReady)
                      [theme.mq.sm]: {
                        opacity: (animated || autoPlayVideo) ? (videoReady ? 1 : 0) : (hover && videoReady ? 1 : 0),
                      },
                      // Mobile: show if animated or autoPlayVideo and ready
                      [theme.maxMQ.sm]: {
                        opacity: (animated || autoPlayVideo) && videoReady ? 1 : 0,
                      },
                    },
                  ]}
                  onCanPlay={handleVideoCanPlay}
                  {...((animated || autoPlayVideo) ? { autoPlay: true, preload: "auto" } : { preload: "none" })}
                >
                  <source src={card.video} type="video/mp4" />
                </video>
              )}
            </div>
            {ar && (
              <div
                css={(theme) => [
                  {
                    zIndex: 1,
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: 40,
                    height: 30,
                    background: theme.colors.soft_gray,
                    color: theme.colors.black50,
                    borderRadius: "0 15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <AR />
              </div>
            )}
            {/* CardFav hidden - keeping component for future use */}
            <CardFav
              size={size}
              deckSlug={card.deck && card.deck.slug}
              id={card._id}
              noFav={true}
              css={{ display: "none" }}
            />
          </div>
        </div>
        {!noArtist && (
          artistHref ? (
            <Link
              href={artistHref}
              css={(theme) => [
                {
                  ...theme.typography.linkNewTypography,
                  marginTop: 10,
                  textAlign: "center",
                  fontSize: 18,
                  display: "block",
                  textDecoration: "none",
                  color: theme.colors[palette === "dark" ? "white50" : "black50"],
                  transition: "color 0.15s ease-out",
                  "&:hover": {
                    color: theme.colors[palette === "dark" ? "white" : "dark_gray"],
                  },
                },
              ]}
              onClick={(e) => {
                e.stopPropagation();
                // Store card data for instant display on card page (same as popup does)
                setNavigationCard({
                  _id: card._id,
                  img: card.img,
                  video: card.video || null,
                  info: (card as GQL.Card).info || null,
                  background: (card as GQL.Card).background || null,
                  cardBackground: (card as GQL.Card).cardBackground || null,
                  edition: (card as GQL.Card).edition || null,
                  deck: { slug: card.deck?.slug || "" },
                  artist: {
                    name: card.artist.name || "",
                    slug: card.artist.slug,
                    country: card.artist.country || null,
                    userpic: card.artist.userpic || null,
                    info: card.artist.info || null,
                    social: (card.artist.social as Record<string, string | null>) || null,
                  },
                });
              }}
            >
              {card.artist.name}
            </Link>
          ) : (
            <Text
              typography="linkNewTypography"
              css={(theme) => [
                {
                  marginTop: 10,
                  textAlign: "center",
                  fontSize: 18,
                  color: theme.colors[palette === "dark" ? "white50" : "black50"],
                  transition: "color 0.15s ease-out",
                },
                hover && {
                  color: theme.colors[palette === "dark" ? "white" : "dark_gray"],
                },
              ]}
            >
              {card.artist.name}
            </Text>
          )
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
