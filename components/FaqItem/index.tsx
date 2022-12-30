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
        variant="body"
        onClick={toggle}
        css={(theme) => [
          {
            textAlign: "left",
            cursor: "pointer",
            display: "block",
            color: theme.colors.text_subtitle_dark,
            paddingTop: theme.spacing(1.5),
            paddingBottom: theme.spacing(1.5),
            transition: theme.transitions.slow("color"),

            "&:hover" :{
              color: theme.colors.text_title_dark,
            }
          },
        ]}
        role="button"
      >
        {question}
      </Text>
      {opened && (
        <Text
          css={(theme) => ({
            marginBottom: theme.spacing(2),
            color: theme.colors.text_title_dark,
            [theme.maxMQ.sm]: {
              lineHeight: 27 / 18,
            },
          })}
        >
          {children}
        </Text>
      )}
    </div>
  );
};

export default FaqItem;
