import { Interpolation, Theme } from "@emotion/react";
import { FC, HTMLAttributes } from "react";
import Button, { Props as ButtonProps } from "../Button";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  buttonProps?: ButtonProps & { css?: Interpolation<Theme> };
  titleText: string;
  subTitleText: string;
  variant?: "h2" | "h3";
  action?: JSX.Element;
}

const BlockTitle: FC<Props> = ({
  titleText,
  subTitleText,
  buttonProps,
  variant = "h2",
  action,
  ...props
}) => {
  return (
    <div {...props}>
      <Text
        component="h2"
        variant={variant}
        css={(theme) => ({
          marginBottom: theme.spacing(2),
        })}
      >
        {titleText}
      </Text>
      <div
        css={(theme) => ({
          paddingBottom: theme.spacing(3),
          borderBottom: "2px solid rgba(0, 0, 0, 0.07)",
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <Text css={{ margin: 0 }} variant="body2">
          {subTitleText}
        </Text>
        {(action || buttonProps) && (
          <div
            css={(theme) => ({ marginLeft: theme.spacing(13), flexShrink: 0 })}
          >
            {action || <Button {...buttonProps} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockTitle;
