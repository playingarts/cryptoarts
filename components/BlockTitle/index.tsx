import { Interpolation, Theme } from "@emotion/react";
import { FC, HTMLAttributes } from "react";
import Button, { Props as ButtonProps } from "../Button";
import Line from "../Line";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  buttonProps?: ButtonProps & { css?: Interpolation<Theme> };
  titleText: string;
  subTitleText?: string | JSX.Element;
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
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <Text component="h2" variant={variant} css={{ margin: 0 }}>
            {titleText}
          </Text>
          {subTitleText && (
            <Text
              css={(theme) => ({ margin: 0, marginTop: theme.spacing(2) })}
              variant="body2"
            >
              {subTitleText}
            </Text>
          )}
        </div>
        {(action || buttonProps) && (
          <div
            css={(theme) => ({ marginLeft: theme.spacing(13), flexShrink: 0 })}
          >
            {action || <Button {...buttonProps} />}
          </div>
        )}
      </div>
      <Line css={{ marginBottom: 0 }} spacing={3} />
    </div>
  );
};

export default BlockTitle;
