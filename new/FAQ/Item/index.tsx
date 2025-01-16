import { FC, HTMLAttributes, useState } from "react";
import Dot from "../../Icons/Dot";
import Text from "../../Text";

const Item: FC<
  HTMLAttributes<HTMLElement> & { question: string; answer: string }
> = ({ question, answer, ...props }) => {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Text
        onClick={() => setOpened(!opened)}
        css={[{ "&:hover": { cursor: "pointer" } }]}
      >
        <Dot css={[{ marginRight: 10 }]} />
        {question}
      </Text>
      <Text
        style={opened ? {} : { display: "none" }}
        typography="paragraphSmall"
      >
        {answer}
      </Text>
    </div>
  );
};

export default Item;
