import { FC, Fragment, HTMLAttributes } from "react";
import Line from "../Line";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  properties: Record<string, string>;
}

const DeckBlock: FC<Props> = ({ properties, ...props }) => (
  <div
    {...props}
    css={{
      display: "flex",
    }}
  >
    <div css={{ flexGrow: 1 }}></div>
    <dl
      css={(theme) => ({
        color: theme.colors.text_title_dark,
        margin: 0,
      })}
    >
      {Object.entries(properties).map(([key, value], index, array) => (
        <Fragment key={key}>
          <Text
            component="dt"
            variant="h6"
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
  </div>
);

export default DeckBlock;
