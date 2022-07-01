import { Interpolation, Theme } from "@emotion/react";
import { FC } from "react";
import Button, { Props as ButtonProps } from "../Button";
import Grid, { Props as GridProps } from "../Grid";
import Line from "../Line";
import Text from "../Text";

interface Props extends Omit<GridProps, "title"> {
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
    <Grid short={true} {...props}>
      <Text
        component="h2"
        variant={variant}
        css={{
          margin: 0,
          gridColumn: "1/ span 5",
        }}
      >
        {title}
      </Text>
      {subTitleText && (
        <Text
          css={(theme) => [
            {
              margin: 0,
              marginTop: theme.spacing(2),
            },
            action || buttonProps
              ? {
                  gridColumn: "1 / span 7",
                  [theme.maxMQ.md]: {
                    gridColumn: "1 / span 6",
                  },
                }
              : {
                  gridColumn: "1 / -1",
                },
          ]}
          variant="body2"
        >
          {subTitleText}
        </Text>
      )}
      {(action || buttonProps) && (
        <div
          css={{
            gridColumn: "span 3 / -1",
            alignSelf: "flex-end",
            zIndex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {action || <Button {...buttonProps} />}
        </div>
      )}
      <div css={{ gridColumn: "-1 / 1" }}>
        <Line spacing={3} />
      </div>
    </Grid>
  );
};

export default BlockTitle;
