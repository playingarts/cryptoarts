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
import Text from "../Text";
import AR from "../Icons/AR";
import { Props as PaletteProps } from "../Pages/Deck/DeckPaletteContext";
import { breakpoints } from "../../source/enums";
import { useSize } from "../../components/SizeProvider";
import { theme } from "../../pages/_app";
import Star from "../Icons/Star";
import Label from "../Label";
import { useFavorites } from "../Contexts/favorites";
import { usePaletteHook } from "../../hooks/usePaletteHook";

const slowTransitionOpacity = theme.transitions.slow("opacity");

const sizes = {
  big: { width: 360, height: 506 },
  hero: { width: 330, height: 464 },
  small: { width: 240, height: 336 },
  nano: { width: 184, height: 260 },
  preview: { width: 270, height: 380 },
};

const sizesHover: typeof sizes = {
  big: { width: 370, height: 520 },
  hero: { width: 340, height: 478 },
  small: { width: 250, height: 350 },
  nano: { width: 190, height: 270 },
  preview: { width: 285, height: 400 },
};

const CardFav: FC<
  HTMLAttributes<HTMLElement> & {
    size: keyof typeof sizes;
    deckSlug?: string;
    id: string;
    noFav?: boolean;
  }
> = memo(({ noFav, deckSlug, id, size, ...props }) => {
  const [hover, setHover] = useState(false);

  const { addItem, isFavorite, removeItem } = useFavorites();

  const [favoriteState, setFavoriteState] = useState(false);

  useEffect(() => {
    deckSlug && setFavoriteState(isFavorite(deckSlug, id));
  }, [isFavorite, deckSlug, id]);

  return (
    <>
      <div
        css={(theme) => [
          {
            transition: theme.transitions.fast("box-shadow"),
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: sizes[size].width,
            boxShadow: favoriteState
              ? "0px 4px 20px 0px #6A5ACD80"
              : "0px 5px 20px 0px rgba(0, 0, 0, 0.20)",
            borderRadius: size === "nano" ? 10 : 15,
            aspectRatio: "0.7076923076923077",
            zIndex: 0,
          },
        ]}
      />
      {noFav ? null : (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={(e) => {
            e.stopPropagation();
            if (deckSlug) {
              if (favoriteState) {
                removeItem(deckSlug, id);
              } else {
                addItem(deckSlug, id);
              }
            }
          }}
          css={(theme) => [
            {
              zIndex: 1,
              position: "absolute",
              right: 0,
              top: 0,
              width: 46,
              height: 46,
              background:
                theme.colors[favoriteState === true ? "pale_gray" : "accent"],
              color:
                theme.colors[favoriteState === true ? "accent" : "soft_gray"],
              borderRadius: "0 15px 0 100px",
            },
          ]}
          {...props}
        >
          <Star
            css={(theme) => [
              {
                marginTop: 6,
                marginLeft: 13,
              },
            ]}
          />
          <Label
            css={(theme) => [
              {
                color: theme.colors[favoriteState ? "black" : "white"],
                background: theme.colors[favoriteState ? "mint" : "black"],
                whiteSpace: "nowrap",
                pointerEvents: "none",
                top: 0,
                right: 0,
                transform: "translate(50%, -100%)",
                position: "absolute",
                textTransform: "initial",

                opacity: 1,
                "@keyframes FavFadeIn": {
                  "0%": {
                    opacity: 0,
                    transform: "translate(50%, -100%)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translate(50%, calc(-100% - 10px))",
                  },
                },
                "@keyframes FavFadeOut": {
                  "100%": {
                    opacity: 0,
                    transform: "translate(50%, -100%)",
                  },
                  "0%": {
                    opacity: 1,
                    transform: "translate(50%, calc(-100% - 10px))",
                  },
                },
                animation: `${
                  hover ? "FavFadeIn" : "FavFadeOut"
                } 100ms forwards linear`,
              },
            ]}
          >
            {favoriteState ? "Favorited" : "Add to Favorites"}
          </Label>
        </div>
      )}
    </>
  );
});

const Card: FC<
  HTMLAttributes<HTMLElement> & {
    card: GQL.Card;
    ar?: boolean;
    size?: keyof typeof sizes;
    noArtist?: boolean;
    interactive?: boolean;
    animated?: boolean;
    noLink?: boolean;
    noFavorite?: boolean;
    palette?: PaletteProps["palette"];
  }
> = memo(({
  card,
  size = "small",
  ar = false,
  noArtist = false,
  interactive = true,
  animated = false,
  noLink = false,
  noFavorite = false,
  palette: paletteProp,
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

  useLayoutEffect(() => {
    const img = new Image();
    img.src = card.img;
    setLoaded(img.complete);
  }, [card]);

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
          width: sizesHover[size].width,
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

            // aspectRatio: "0.7142857142857143",
            height: sizesHover[size].height,
          },
        ]}
        style={
          (width >= breakpoints.md &&
            hover &&
            interactive && {
              transition: "initial",
              transform: `perspective(${sizesHover[size].width}px) rotateX(${
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
              // scale: 1,
              width: sizes[size].width,
              // top: 7,
              // left: 5,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",

              // width: "calc(100% - 10px)",
              aspectRatio: "0.7076923076923077",
              position: "relative",
              transitionTimingFunction: "linear",
              transitionDuration: "50ms",
              transitionProperty: "scale",
              transition: theme.transitions.fast(["width", "height"]),

              // background: "transparent",
            },
          ]}
          style={(hover && { width: sizesHover[size].width }) || {}}
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
              src={card.img}
              key={card.img + "card" + size}
              css={[
                {
                  width: "100%",
                  height: "100%",
                  lineHeight: 1,
                },
                {
                  transition: loaded ? slowTransitionOpacity : "none",
                },
              ]}
              style={{
                opacity: loaded ? 1 : 0,
              }}
              loading="lazy"
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
                      borderRadius: theme.spacing(1),
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
});

export default Card;
