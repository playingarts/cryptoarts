import { FC, HTMLAttributes, useState } from "react";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLDivElement> {
  question: string;
  children: string;
}

const FaqItem: FC<Props> = ({ question, children, ...props }) => {
  const [opened, open] = useState(false);

  const toggle = () => open(!opened);

  return (
    <div {...props}>
      <Text
        component="span"
        variant="body2"
        onClick={toggle}
        css={{ textAlign: "left", cursor: "pointer" }}
        role="button"
      >
        {question}
      </Text>
      {opened && <Text css={{ margin: 0 }}>{children}</Text>}
    </div>
  );
};

export default FaqItem;
