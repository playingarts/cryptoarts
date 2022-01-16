import { FC, HTMLAttributes, useRef } from "react";
import { useEffect, useState } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  card: GQL.Card;
  animated?: boolean;
  isStatic?: boolean;
}

const Card: FC<Props> = ({ card, animated, isStatic, ...props }) => {
  const [hovered, setHover] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

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
        width: theme.spacing(28.5),
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
        css={(theme) => ({
          transition: theme.transitions.fast("all"),
          overflow: "hidden",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)",
          position: "relative",
          height: theme.spacing(40),
          borderRadius: theme.spacing(1.5),
          marginBottom: theme.spacing(2),
          background: theme.colors.dark_gray,
        })}
        style={
          !isStatic && hovered
            ? {
                marginTop: "-20px",
                marginBottom: "40px",
                boxShadow: "0 20px 10px rgba(0, 0, 0, 0.25)",
              }
            : undefined
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
      <div>{card.artist.name}</div>
    </div>
  );
};

export default Card;
