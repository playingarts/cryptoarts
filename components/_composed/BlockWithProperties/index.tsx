import { FC, Fragment, HTMLAttributes, ReactElement } from "react";
import BlockTitle, { Props as BlockTitleProps } from "../../BlockTitle";
import Grid from "../../Grid";
import Line from "../../Line";
import Text from "../../Text";

interface Props
  extends Pick<BlockTitleProps, "title" | "subTitleText" | "action">,
    Pick<HTMLAttributes<HTMLElement>, "children"> {
  palette?: "light" | "dark";
  properties: { key: string | ReactElement; value: string | ReactElement }[];
}

const BlockWithProperties: FC<Props> = ({
  title,
  subTitleText,
  action,
  properties,
  children,
  palette = "dark",
}) => {
  return (
    <BlockTitle
      {...{ title, subTitleText, action }}
      variant="h3"
      palette={palette}
      
      css={(theme) => [
        [theme.maxMQ.sm], {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          paddingTop: theme.spacing(1),
        },
        [theme.maxMQ.md], {
          paddingTop: theme.spacing(1),
        },
      ]}
    >
      <Grid
        css={(theme) => [
          {
            paddingTop: theme.spacing(3),
            [theme.mq.sm]: {
              gap: theme.spacing(3),
            },
            [theme.maxMQ.sm]: {
              // paddingLeft: theme.spacing(2),
              // paddingRight: theme.spacing(2),
            },
          },
        ]}
      >
        <Grid
          short={true}
          css={(theme) => [
            {
              gridColumn: "1/-1",
              rowGap: 0,
              color: theme.colors.white,
              [theme.maxMQ.sm]: {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
              },
            },
          ]}
        >
          {properties.map(({ key, value }, index) => (
            <Fragment key={"propertyKey" + index}>
              {typeof key === "string" ? (
                <Text
                  variant="h7"
                  css={(theme) => [
                    {
                      gridColumn: "1 / 3",
                      [theme.maxMQ.sm]: {
                        gridColumn: "1 / -1",
                      },
                      margin: 0,
                      color:
                        palette === "dark"
                          ? theme.colors.text_subtitle_light
                          : theme.colors.text_subtitle_dark,
                    },
                  ]}
                >
                  {key}
                </Text>
              ) : (
                key
              )}
              {typeof value === "string" ? (
                <Text
                  variant="body"
                  css={(theme) => [
                    {
                      width: "100%",
                      margin: 0,
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      gridColumn: "3 / -1",
                      color:
                        palette === "dark"
                          ? theme.colors.page_bg_light
                          : theme.colors.page_bg_dark,
                      [theme.maxMQ.sm]: {
                        fontSize: 16,
                        gridColumn: "1 / -1",
                        paddingTop: 5,
                      },
                    },
                  ]}
                >
                  {value}
                </Text>
              ) : (
                value
              )}
              <Line
                palette={palette}
                spacing={1.5}
                css={{ gridColumn: "1/-1", width: "100%" }}
              />
            </Fragment>
          ))}
        </Grid>
        {children}
      </Grid>
    </BlockTitle>
  );
};

export default BlockWithProperties;
