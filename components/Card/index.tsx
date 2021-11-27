import { FC, HTMLAttributes, useRef } from "react";
import { useEffect, useState } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  card: GQL.Card;
}

const Card: FC<Props> = ({ card, ...props }) => {
  const [hover, setHover] = useState(false);
  const [zindex, setzindex] = useState<number>(0);
  const videoref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoref.current) {
      if (!hover) {
        videoref.current.pause();
        videoref.current.currentTime = 0;
      } else if (hover) {
        videoref.current.play();
      }
    }
  }, [hover]);

  return (
    <div
      {...props}
      css={{
        transition: "0.5s",
        marginBottom: "25px",
        marginTop: "25px",
        height: "fit-content",
        width: "285px",
        "&:hover": {
          cursor: "pointer",
          "& .artwork": {
            marginTop: "-20px",
            marginBottom: "39px",
            boxShadow: "0 20px 10px rgba(0, 0, 0, 0.25)",
          },
          "& .author": {
            color: "rgba(10, 10, 10, 0.7)",
          },
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        sessionStorage.setItem("scrollPos", window.pageYOffset.toString());
      }}
    >
      <div
        className={"artwork"}
        css={(theme) => ({
          transition: "0.25s",
          overflow: "hidden",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)",
          position: "relative",
          height: 400,
          borderRadius: 15,
          marginBottom: 19,
          background: theme.colors.darkGray,
        })}
      >
        {card.video && (
          <video
            loop
            muted
            playsInline
            preload="none"
            ref={videoref}
            css={{
              transition: "0.5s",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            style={{ opacity: zindex }}
            onLoadedData={() => {
              setzindex(1);
            }}
            onLoadStart={() => setzindex(0)}
          >
            <source src={card.video} type="video/mp4" />
          </video>
        )}
      </div>
      <div
        className={"author"}
        css={{
          transition: "0.25s",
          textAlign: "center",
          color: "rgba(10, 10, 10, 0.5)",
          fontWeight: 500,
          fontsize: 18,
          lineheight: 21,
        }}
      >
        {/* {card.author} */}
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
