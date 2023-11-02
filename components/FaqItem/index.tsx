import { FC, HTMLAttributes, useState } from "react";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLDivElement> {
  question: string;
  children: string;
  palette?: "light" | "dark";
}

const FaqItem: FC<Props> = ({
  question,
  children,
  palette = "light",
  ...props
}) => {
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
            color:
              palette === "light"
                ? theme.colors.text_subtitle_dark
                : theme.colors.text_subtitle_light,
            paddingTop: theme.spacing(1.5),
            paddingBottom: theme.spacing(1.5),
            transition: theme.transitions.slow("color"),

            [theme.maxMQ.sm]: {
              fontSize: "15px",
            },

            "&:hover": {
              color:
                palette === "light"
                  ? theme.colors.text_title_dark
                  : theme.colors.text_title_light,
            },
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
            color:
              palette === "light"
                ? theme.colors.text_title_dark
                : theme.colors.text_title_light,
            paddingLeft: "20px",
            paddingRight: "20px",
            lineHeight: 27 / 18,
            [theme.maxMQ.sm]: {
              fontSize: "15px",
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
