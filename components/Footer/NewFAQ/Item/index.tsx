import { FC, HTMLAttributes, ReactNode, useState } from "react";
import Dot from "../../../Icons/Dot";
import Text from "../../../Text";

const Item: FC<
  HTMLAttributes<HTMLElement> & { question: string; answer: string | ReactNode; palette?: "light" | "dark" }
> = ({ question, answer, palette = "light", ...props }) => {
  const [opened, setOpened] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div {...props}>
      <Text
        onClick={() => setOpened(!opened)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        css={(theme) => ({
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontSize: 20,
          color: theme.colors[palette === "dark" ? "white75" : "black"],
        })}
        typography="newh4"
      >
        <Dot
          css={(theme) => ({
            marginRight: 10,
            flexShrink: 0,
            transition: theme.transitions.fast(["transform", "left"]),
            transform: opened ? "rotate(90deg)" : "rotate(0deg)",
            position: "relative",
            left: !opened && hover ? 3 : 0,
          })}
        />
        {question}
      </Text>
      <div
        css={{
          overflow: "hidden",
          transition: "max-height 0.3s ease, opacity 0.3s ease, margin 0.3s ease",
          maxHeight: opened ? 500 : 0,
          opacity: opened ? 1 : 0,
          marginTop: opened ? 15 : 0,
        }}
      >
        <Text
          typography="paragraphSmall"
          css={(theme) => ({
            paddingBottom: 15,
            maxWidth: 520,
            color: theme.colors[palette === "dark" ? "white75" : "black"],
          })}
        >
          {answer}
        </Text>
      </div>
    </div>
  );
};

export default Item;
