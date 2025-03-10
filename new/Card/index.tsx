import { FC, HTMLAttributes, useState } from "react";
import Text from "../Text";
import AR from "../Icons/AR";
import { usePalette } from "../Pages/Deck/DeckPaletteContext";

const sizes = {
  big: { width: 360, height: 506 },
  small: { width: 240, height: 336 },
  nano: { width: 184, height: 260 },
  preview: { width: 270, height: 380 },
};

const sizesHover: typeof sizes = {
  big: { width: 370, height: 520 },
  small: { width: 250, height: 350 },
  nano: { width: 190, height: 270 },
  preview: { width: 300, height: 400 },
};

const Card: FC<
  HTMLAttributes<HTMLElement> & {
    card: GQL.Card;
    ar?: boolean;
    size?: keyof typeof sizes;
    noArtist?: boolean;
  }
> = ({ card, size = "small", ar = false, noArtist = false, ...props }) => {
  const [hover, setHover] = useState(false);
  const { palette } = usePalette();

  return (
    <div
      css={[
        {
          width: sizesHover[size].width,
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
              aspectRatio: "0.7125",
              position: "relative",
              transitionTimingFunction: "linear",
              transitionDuration: "50ms",
              transitionProperty: "scale",
              borderRadius: size === "nano" ? 10 : 20,
              overflow: "hidden",
              transition: theme.transitions.fast(["width", "height"]),
              // boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.10)",
              background:
                palette === "dark"
                  ? "linear-gradient(45deg, #2d2d2d 0%, #181818 50%, #2d2d2d 100%)"
                  : "linear-gradient(45deg, #d6d6d6 0%, #ffffff 50%, #d6d6d6 100%)",

              // background: "transparent",
            },
          ]}
          style={(hover && { width: sizesHover[size].height * 0.7125 }) || {}}
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
