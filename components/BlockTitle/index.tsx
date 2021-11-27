import { Interpolation, Theme } from "@emotion/react";
import { FC, HTMLAttributes } from "react";
import Button, { Props as ButtonProps } from "../Button";

interface Props extends HTMLAttributes<HTMLElement> {
  buttonProps?: ButtonProps & { css: Interpolation<Theme> };
  titleText: string;
  subTitleText: string;
}

const BlockTitle: FC<Props> = ({
  titleText,
  subTitleText,
  buttonProps,
  ...props
}) => {
  return (
    <div {...props}>
      <h2
        css={(theme) => ({
          marginBottom: theme.spacing(2),
        })}
      >
        {titleText}
      </h2>
      <div
        css={(theme) => ({
          paddingBottom: theme.spacing(3),
          borderBottom: "2px solid rgba(0, 0, 0, 0.07)",
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <div
          css={{
            fontSize: 22,
            lineHeight: 1.5,
          }}
        >
          {subTitleText}
        </div>
        {buttonProps && (
          <div css={(theme) => ({ marginLeft: theme.spacing(13) })}>
            <Button {...buttonProps} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockTitle;
