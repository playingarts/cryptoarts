import { FC, HTMLAttributes } from "react";
import Line from "../Line";
import Link from "../Link";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  withLine?: boolean;
  moreLink?: string;
  artist?: GQL.Artist;
}

const Quote: FC<Props> = ({
  children,
  withLine,
  moreLink,
  artist,
  ...props
}) => {
  return (
    <div {...props}>
      {withLine && <Line css={{ marginTop: 0 }} spacing={6} />}
      <div style={{ display: "flex" }}>
        <div>
          <Text css={{ margin: 0 }} variant="body3">
            {children}
          </Text>
          {moreLink && (
            <Text
              component={Link}
              href={moreLink}
              variant="label"
              css={(theme) => ({
                marginTop: theme.spacing(2),
                display: "inline-block",
                color: theme.colors.text_subtitle_dark,
              })}
            >
              Read more
            </Text>
          )}
        </div>
        {artist && (
          <div
            css={(theme) => ({
              marginLeft: theme.spacing(13.5),
              width: theme.spacing(22.5),
              flexShrink: 0,
            })}
          >
            <Text variant="h5">{artist.name}</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quote;
