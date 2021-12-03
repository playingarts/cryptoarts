import { FC, Fragment, HTMLAttributes } from "react";
import Title from "../Title";

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
            <Title
              component="dt"
              css={{
                textTransform: "uppercase",
                fontSize: 15,
              }}
            >
              {key}
            </Title>
            <dd
              css={(theme) => ({
                "&:last-child": {
                  marginBottom: 0,
                },
                fontSize: 22,
                margin: 0,
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(2),
                paddingBottom: theme.spacing(2),
                borderBottom: "1px solid rgba(0, 0, 0, 0.07)",
              })}
            >
              {value}
            </dd>
          </Fragment>
        ))}
      </dl>
    </div>
  );
};

export default DeckBlock;
