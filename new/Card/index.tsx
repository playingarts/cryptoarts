import { FC, HTMLAttributes, useState } from "react";
import Text from "../Text";
import AR from "../Icons/AR";

const Card: FC<
  HTMLAttributes<HTMLElement> & {
    card: GQL.Card;
    ar?: boolean;
    size?: "big" | "small" | "nano" | "preview";
    noArtist?: boolean;
  }
> = ({ card, size = "small", ar = false, noArtist = false, ...props }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      css={[
        {
          width: size === "nano" ? 184 : 300,
          aspectRatio: "0.7142857142857143",
        },
      ]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <div css={[{ position: "relative" }]}>
        <div
          css={(theme) => [
            {
              // scale: 1,
              top: 7,
              left: 5,
              width: "calc(100% - 10px)",
              aspectRatio: "0.7142857142857143",
              position: "relative",
              transitionTimingFunction: "linear",
              transitionDuration: "50ms",
              transitionProperty: "scale",
              borderRadius: size === "nano" ? 10 : 20,
              overflow: "hidden",
              transition: theme.transitions.fast(["top", "left", "width"]),
              // boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.10)",
              background:
                "linear-gradient(45deg, #d6d6d6 0%, #ffffff 50%, #d6d6d6 100%)",
              // background: "transparent",
            },
          ]}
          style={(hover && { top: 0, left: 0, width: "100%" }) || {}}
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
            ]}
            loading="lazy"
            alt={""}
          />

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
              color: theme.colors.black50,
              transition: "linear 50ms color",
            },
            hover && { color: theme.colors.dark_gray },
          ]}
        >
          {card.artist.name}
        </Text>
      )}
    </div>
  );
};

export default Card;
