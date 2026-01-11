import {
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Text from "../Text";
import AR from "../Icons/AR";
import { Props as PaletteProps } from "../Pages/Deck/DeckPaletteContext";
import { breakpoints } from "../../source/enums";
import { useSize } from "../SizeProvider";
import { theme } from "../../styles/theme";
import { usePaletteHook } from "../../hooks/usePaletteHook";
import CardFav from "./CardFav";
import { cardSizes, cardSizesHover, CardSize } from "./sizes";

const slowTransitionOpacity = theme.transitions.slow("opacity");

export interface CardProps extends HTMLAttributes<HTMLElement> {
  card: GQL.Card;
  ar?: boolean;
  size?: CardSize;
  noArtist?: boolean;
  interactive?: boolean;
  animated?: boolean;
  noLink?: boolean;
  noFavorite?: boolean;
  palette?: PaletteProps["palette"];
  priority?: boolean;
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
    noLink = false,
    noFavorite = false,
    palette: paletteProp,
    priority = false,
    ...props
  }) => {
    const [hover, setHover] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [{ x, y }, setSkew] = useState({ x: 0, y: 0 });

    const hideLoader = useCallback(() => setLoaded(true), []);
    const handleMouseEnter = useCallback(() => setHover(true), []);
    const handleMouseLeave = useCallback(() => setHover(false), []);

    const wrapper = useRef<HTMLDivElement>(null);
    const video = useRef<HTMLVideoElement>(null);

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

    // Use smaller images for non-big sizes (replace -big-hd with -big)
    const imgSrc = size !== "big" ? card.img.replace("-big-hd/", "-big/") : card.img;

    useLayoutEffect(() => {
      const img = new Image();
      img.src = imgSrc;
      setLoaded(img.complete);
    }, [imgSrc]);

    useLayoutEffect(() => {
      if (animated || !video.current) {
        return;
      }

      if (!hover) {
        video.current.pause();
        video.current.currentTime = 0;
      } else {
        video.current.play();
      }
    }, [hover, animated]);

    return (
      <div
        css={[
          {
            width: cardSizesHover[size].width,
            "&:hover": {
              cursor: "pointer",
            },
          },
        ]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div
          css={[
            {
              position: "relative",
              height: cardSizesHover[size].height,
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
              <img
                src={imgSrc}
                key={imgSrc + "card" + size}
                css={[
                  {
                    width: "100%",
                    height: "100%",
                    lineHeight: 1,
                  },
                  !priority && {
                    transition: loaded ? slowTransitionOpacity : "none",
                  },
                ]}
                style={{
                  opacity: priority || loaded ? 1 : 0,
                }}
                loading={priority ? "eager" : "lazy"}
                {...(priority && { fetchPriority: "high" })}
                onLoad={hideLoader}
                alt={""}
              />
              {card.video && (!animated ? width >= breakpoints.sm : true) && (
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
                      [theme.mq.sm]: {
                        borderRadius: theme.spacing(1.5),
                      },
                      [theme.maxMQ.sm]: {
                        // Mobile styles - to be implemented
                      },
                      overflow: "hidden",
                      [theme.mq.sm]: {
                        opacity: animated ? 1 : hover ? (loaded ? 1 : 0) : 0,
                      },

                      width: "100%",
                      height: "100%",
                      lineHeight: 1,

                      opacity: loaded ? 1 : 0,

                      transition: loaded ? slowTransitionOpacity : "none",
                    },
                  ]}
                  style={{
                    opacity: loaded ? 1 : 0,

                    transition: loaded ? slowTransitionOpacity : "none",
                  }}
                  onCanPlay={hideLoader}
                  {...(animated ? { autoPlay: true } : { preload: "none" })}
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
            <CardFav
              size={size}
              deckSlug={card.deck && card.deck.slug}
              id={card._id}
              noFav={noFavorite}
              css={(theme) => [
                {
                  opacity: 0,
                  transition: theme.transitions.fast("opacity"),
                },
                hover && {
                  opacity: 1,
                },
              ]}
            />
          </div>
        </div>
        {!noArtist && (
          <Text
            typography="linkNewTypography"
            css={(theme) => [
              {
                marginTop: 10,
                textAlign: "center",
                color: theme.colors[palette === "dark" ? "white50" : "black50"],
                transition: "linear 50ms color",
              },
              hover && {
                color: theme.colors[palette === "dark" ? "white" : "dark_gray"],
              },
            ]}
          >
            {card.artist.name}
          </Text>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
