import { FC, HTMLAttributes, useRef } from "react";
import { useEffect, useState } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  card: GQL.Card;
}

const Card: FC<Props> = ({ card, ...props }) => {
  const [hovered, setHover] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video.current) {
      return;
    }

    if (!hovered) {
      video.current.pause();
      video.current.currentTime = 0;
    } else {
      video.current.play();
    }
  }, [hovered]);

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
        color: "rgba(10, 10, 10, 0.5)",
        fontWeight: 500,
        fontsize: 18,
        lineheight: 21,
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={"artwork"}
        css={(theme) => ({
          transition: theme.transitions.fast("all"),
          overflow: "hidden",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)",
          position: "relative",
          height: theme.spacing(40),
          borderRadius: theme.spacing(1.5),
          marginBottom: theme.spacing(2),
          background: theme.colors.darkGray,
        })}
        style={
          hovered
            ? {
                marginTop: "-20px",
                marginBottom: "40px",
                boxShadow: "0 20px 10px rgba(0, 0, 0, 0.25)",
              }
            : undefined
        }
      >
        {(!card.video || !loaded || !hovered) && (
          <img src={card.img} height="100%" />
        )}
        {card.video && (
          <video
            loop
            muted
            playsInline
            preload="none"
            ref={video}
            height="100%"
            onLoadedData={() => setLoaded(true)}
          >
            <source src={card.video} type="video/mp4" />
          </video>
        )}
      </div>
      <div>
        {card.artist.name}
        {/* {card.name && (
          <div
            css={{
              paddingTop: 10,
              color: "rgba(10, 10, 10, 0.7)",
            }}
          >
            {card.name}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Card;
