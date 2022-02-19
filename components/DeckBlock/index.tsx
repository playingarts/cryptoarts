import { FC, Fragment } from "react";
import Grid, { Props as GridProps } from "../Grid";
import Line from "../Line";
import Text from "../Text";

interface Props extends GridProps {
  properties: Record<string, string>;
}

const DeckBlock: FC<Props> = ({ properties, ...props }) => (
  <Grid {...props}>
    <div css={{ gridColumn: "span 6" }}></div>
    <dl
      css={(theme) => ({
        color: theme.colors.text_title_dark,
        margin: 0,
        gridColumn: "7 / span 5",
        alignSelf: "center",
      })}
    >
      {Object.entries(properties).map(([key, value], index, array) => (
        <Fragment key={key}>
          <Text
            component="dt"
            variant="h7"
            css={(theme) => ({ color: theme.colors.text_subtitle_dark })}
          >
            {key}
          </Text>
          <Text
            component="dd"
            variant="body2"
            css={(theme) => ({
              "&:last-child": {
                marginBottom: 0,
              },
              margin: 0,
              marginTop: theme.spacing(1),
            })}
          >
            {value}
          </Text>
          <Line
            spacing={2}
            css={index === array.length - 1 ? { marginBottom: 0 } : {}}
          />
        </Fragment>
      ))}
    </dl>
  </Grid>
);

export default DeckBlock;
