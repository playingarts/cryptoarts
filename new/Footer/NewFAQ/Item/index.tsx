import { FC, HTMLAttributes, ReactNode, useState } from "react";
import Dot from "../../../Icons/Dot";
import Text from "../../../Text";

const Item: FC<
  HTMLAttributes<HTMLElement> & { question: string; answer: string | ReactNode }
> = ({ question, answer, ...props }) => {
  const [opened, setOpened] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div>
      <Text
        onClick={() => setOpened(!opened)}
        css={[{ "&:hover": { cursor: "pointer" } }]}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        typography="newh4"
      >
        <Dot
          css={(theme) => [
            {
              marginRight: 10,
              position: "relative",
              transition: theme.transitions.fast("left"),
            },
          ]}
          style={
            opened
              ? {
                  rotate: "90deg",
                }
              : { left: hover ? 3 : 0 }
          }
        />
        {question}
      </Text>
      <Text
        style={opened ? {} : { display: "none" }}
        typography="paragraphSmall"
        css={[{ marginTop: 30 }]}
      >
        {answer}
      </Text>
    </div>
  );
};

export default Item;
