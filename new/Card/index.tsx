import { FC, HTMLAttributes, useState } from "react";
import Text from "../Text";
import AR from "../Icons/AR";

const Card: FC<
  HTMLAttributes<HTMLElement> & { card: GQL.Card; ar?: boolean }
> = ({ card, ar = false, ...props }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      css={[{ width: 300 }]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <div css={[{ position: "relative", height: 400 }]}>
        <div
          css={[
            {
              scale: 0.95,
              position: "absolute",
              transitionTimingFunction: "linear",
              transitionDuration: "50ms",
              transitionProperty: "scale",
              borderRadius: 20,
              overflow: "hidden",
              inset: 0,
            },
          ]}
          style={(hover && { scale: 1 }) || {}}
        >
          <img
            src={card.img}
            css={[
              {
                width: "100%",
                height: "100%",
              },
            ]}
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
    </div>
  );
};

export default Card;
