import { FC, Fragment, HTMLAttributes } from "react";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  properties: Record<string, string>;
}

const DeckBlock: FC<Props> = ({ properties, ...props }) => {
  return (
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
        {Object.entries(properties).map(([key, value]) => (
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
                marginBottom: theme.spacing(2),
                paddingBottom: theme.spacing(2),
                borderBottom: "1px solid rgba(0, 0, 0, 0.07)",
              })}
            >
              {value}
            </Text>
          </Fragment>
        ))}
      </dl>
    </div>
  );
};

export default DeckBlock;
