import { Interpolation, Theme } from "@emotion/react";
import { FC, HTMLAttributes } from "react";
import Button, { Props as ButtonProps } from "../Button";
import Grid from "../Grid";
import Line from "../Line";
import Text from "../Text";

interface Props extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  buttonProps?: ButtonProps & { css?: Interpolation<Theme> };
  title: string | JSX.Element;
  subTitleText?: string | JSX.Element;
  variant?: "h2" | "h3";
  action?: JSX.Element;
}

const BlockTitle: FC<Props> = ({
  title,
  subTitleText,
  buttonProps,
  variant = "h2",
  action,
  ...props
}) => {
  return (
    <Grid {...props}>
      <div css={{ gridColumn: "span 7" }}>
        <Text
          component="h2"
          variant={variant}
          css={{ margin: 0, gridColumn: "span 10" }}
        >
          {title}
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
          css={{
            gridColumn: "8 / span 3",
            textAlign: "right",
            alignSelf: "flex-end",
          }}
        >
          {action || <Button {...buttonProps} />}
        </div>
      )}
      <div css={{ gridColumn: "span 10" }}>
        <Line css={{ marginBottom: 0 }} spacing={3} />
      </div>
    </Grid>
  );
};

export default BlockTitle;
