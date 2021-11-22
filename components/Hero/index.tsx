import { css } from "@emotion/css";
import { FC, HTMLAttributes } from "react";
import Title from "../Title";

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
  text: string;
}

const Hero: FC<Props> = ({ title, text, ...props }) => {
  return (
    <div {...props}>
      <Title
        component="h1"
        className={css`
          font-size: 100px;
          line-height: 105px;
          margin: 0;
        `}
      >
        {title}
      </Title>
      <p
        className={css`
          font-size: 30px;
          line-height: 1.5;
          margin: 20px 0 0;
        `}
      >
        {text}
      </p>
    </div>
  );
};

export default Hero;
