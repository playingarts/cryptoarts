import { FC, HTMLAttributes } from "react";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
  text: string;
}

const Hero: FC<Props> = ({ title, text, ...props }) => {
  return (
    <div {...props}>
      <Text component="h1">{title}</Text>
      <Text
        variant="body3"
        css={(theme) => ({
          marginTop: theme.spacing(2),
        })}
      >
        {text}
      </Text>
    </div>
  );
};

export default Hero;
