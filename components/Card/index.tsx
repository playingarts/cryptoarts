import { FC, HTMLAttributes, useRef } from "react";
import { useEffect, useState } from "react";
import { theme } from "../../pages/_app";

interface Props extends HTMLAttributes<HTMLElement> {
  card: GQL.Card;
  animated?: boolean;
  isStatic?: boolean;
  size?: "big";
  interactive?: boolean;
}

const Card: FC<Props> = ({
  card,
  animated,
  isStatic,
  size,
  interactive,
  ...props
}) => {
  const [hovered, setHover] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const width = size === "big" ? 37 : 28.5;
  const wrapper = useRef<HTMLDivElement>(null);
  const [{ x, y }, setSkew] = useState({ x: 0, y: 0 });

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
        "&:hover": {
          color: "rgba(10, 10, 10, 0.7)",
        },
        transition: theme.transitions.fast("color"),
        width: theme.spacing(width),
        textAlign: "center",
        color: theme.colors.text_subtitle_dark,
        fontWeight: 500,
        fontsize: 18,
        lineheight: 21,
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
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
              transition: theme.transitions.fast("all"),
              overflow: "hidden",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)",
              position: "relative",
              height: theme.spacing(width * 1.405),
              borderRadius: theme.spacing(1.5),
              marginBottom: theme.spacing(2),
              background: theme.colors.dark_gray,
            },
          ]}
          style={
            (hovered &&
              (interactive
                ? {
                    transition: "initial",
                    transform: `perspective(${theme.spacing(
                      width
                    )}px) rotateX(${-y * 10}deg) rotateY(${
                      x * 10
                    }deg) scale3d(1, 1, 1)`,
                  }
                : !isStatic && {
                    marginTop: "-20px",
                    marginBottom: "40px",
                    boxShadow: "0 20px 10px rgba(0, 0, 0, 0.25)",
                  })) ||
            undefined
          }
        >
          {!animated && (!card.video || !loaded || !hovered) && (
            <img src={card.img} height="100%" />
          )}
          {card.video && (
            <video
              loop
              muted
              playsInline
              ref={video}
              height="100%"
              {...(animated
                ? { autoPlay: true }
                : {
                    onLoadedData: () => setLoaded(true),
                    preload: "none",
                  })}
            >
              <source src={card.video} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <div>{card.artist.name}</div>
    </div>
  );
};

export default Card;
