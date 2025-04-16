import {
  FC,
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Text from "../Text";
import AR from "../Icons/AR";
import { usePalette } from "../Pages/Deck/DeckPaletteContext";
import { breakpoints } from "../../source/enums";
import { useSize } from "../../components/SizeProvider";
import { theme } from "../../pages/_app";

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

const Card: FC<
  HTMLAttributes<HTMLElement> & {
    card: GQL.Card;
    ar?: boolean;
    size?: keyof typeof sizes;
    noArtist?: boolean;
    interactive?: boolean;
    animated?: boolean;
    noLink?: boolean;
  }
> = ({
  card,
  size = "small",
  ar = false,
  noArtist = false,
  interactive = true,
  animated = false,
  noLink = false,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [{ x, y }, setSkew] = useState({ x: 0, y: 0 });

  const hideLoader = () => setLoaded(true);

  const wrapper = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const { width } = useSize();
  const { palette } = usePalette();

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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
          onMouseMove: ({ clientX, clientY }) => {
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
              borderRadius: size === "nano" ? 10 : 20,
              overflow: "hidden",
              transition: theme.transitions.fast(["width", "height"]),
              boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.10)",
              background:
                palette === "dark"
                  ? "linear-gradient(45deg, #2d2d2d 0%, #181818 50%, #2d2d2d 100%)"
                  : "linear-gradient(45deg, #d6d6d6 0%, #ffffff 50%, #d6d6d6 100%)",

              // background: "transparent",
            },
          ]}
          style={(hover && { width: sizesHover[size].width }) || {}}
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

          {ar && (
            <div
              css={(theme) => [
                {
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
};

export default Card;
