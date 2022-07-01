import { FC, HTMLAttributes, useRef } from "react";
import { useEffect, useState } from "react";
import { theme } from "../../pages/_app";
import Image from "next/image";
import Loader from "../Loader";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  card: GQL.Card;
  animated?: boolean;
  isStatic?: boolean;
  size?: "big";
  interactive?: boolean;
  noInfo?: boolean;
  owned?: boolean;
  sorted?: boolean;
}

const Card: FC<Props> = ({
  card,
  animated,
  isStatic,
  size,
  interactive,
  noInfo,
  owned,
  sorted,
  ...props
}) => {
  const [hovered, setHover] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const width = size === "big" ? 37 : 28.5;
  const height = size === "big" ? 52 : 40;
  const wrapper = useRef<HTMLDivElement>(null);
  const [{ x, y }, setSkew] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const hideLoader = () => setLoaded(true);

  animated = !card.img || (animated && !!card.video);

  useEffect(() => {
    if (animated || !video.current) {
      return;
    }

    if (!hovered) {
      video.current.pause();
      video.current.currentTime = 0;
    } else {
      video.current.play();
    }
  }, [hovered, animated]);

  return (
    <div
      {...props}
      css={(theme) => ({
        transition: theme.transitions.fast("color"),
        width: theme.spacing(width),
        textAlign: "center",
        fontWeight: 500,
        fontsize: 18,
        lineheight: 21,
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        css={(theme) => [
          {
            transition: theme.transitions.fast(["transform", "box-shadow"]),
            position: "relative",
            borderRadius: 15,
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)",
          },
          owned && {
            "@keyframes gradient": {
              "0%": {
                backgroundPosition: "0% 50%",
              },
              "50%": {
                backgroundPosition: "100% 50%",
              },
              "100%": {
                backgroundPosition: "0% 50%",
              },
            },
            ":before": {
              pointerEvents: "none",
              content: '""',
              position: "absolute",
              boxSizing: "content-box",
              top: -theme.spacing(0.5),
              left: -theme.spacing(0.5),
              padding: theme.spacing(0.5),
              width: "100%",
              height: "100%",
              borderRadius: theme.spacing(2),
              background: theme.colors.eth,
              backgroundSize: "400% 100%",
              animation: "gradient 5s ease infinite",
            },
          },
          hovered &&
            !interactive &&
            !isStatic && {
              transform: `translate(0, -${theme.spacing(2)}px)`,
              boxShadow: "0px 10px 20px 4px rgba(0, 0, 0, 0.25)",
            },
        ]}
        style={
          (hovered &&
            interactive && {
              transition: "initial",
              transform: `perspective(${theme.spacing(width)}px) rotateX(${
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

            const {
              left,
              width,
              top,
              height,
            } = wrapper.current.getBoundingClientRect();

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
              overflow: "hidden",
              position: "relative",
              height: theme.spacing(height),
              borderRadius: theme.spacing(1.5),
              background: card.background || theme.colors.text_title_light,
            },
          ]}
        >
          {!animated && (
            <div
              style={{
                opacity: loaded ? 1 : 0,
                transition: theme.transitions.slow("opacity"),
              }}
            >
              <Image
                quality={100}
                width={theme.spacing(width)}
                height={theme.spacing(height)}
                src={card.img}
                alt={card.info}
                css={(theme) => ({ borderRadius: theme.spacing(1.5) })}
                onLoadingComplete={hideLoader}
                unoptimized={true}
              />
            </div>
          )}
          {card.video && (
            <video
              loop
              muted
              playsInline
              ref={video}
              css={(theme) => ({
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: 15,
                overflow: "hidden",
                opacity: animated ? 1 : hovered ? (loaded ? 1 : 0) : 0,
                width: theme.spacing(width),
                height: theme.spacing(height),
              })}
              onLoadedData={hideLoader}
              {...(animated ? { autoPlay: true } : { preload: "none" })}
            >
              <source src={card.video} type="video/mp4" />
            </video>
          )}
          {!loaded && (
            <Loader
              css={(theme) => ({
                color: theme.colors.light_gray,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              })}
            />
          )}
        </div>
      </div>
      {!noInfo && (
        <Text
          variant="label"
          css={(theme) => ({ margin: 0, marginTop: theme.spacing(2) })}
        >
          {card.artist.name}
        </Text>
      )}
      {sorted && (
        <Text
          variant="label"
          css={(theme) => ({ margin: 0, marginTop: theme.spacing(0.5) })}
        >
          {card.price ? (
            `Ξ${card.price}`
          ) : (
            <span css={{ opacity: 0.5 }}>Not On Sale</span>
          )}
        </Text>
      )}
    </div>
  );
};

export default Card;
