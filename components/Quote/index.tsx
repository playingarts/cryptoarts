import { FC, HTMLAttributes } from "react";
import Arrowed from "../Arrowed";
import Behance from "../Icons/Behance";
import Facebook from "../Icons/Facebook";
import Foundation from "../Icons/Foundation";
import Instagram from "../Icons/Instagram";
import Twitter from "../Icons/Twitter";
import Website from "../Icons/Website";
import Line from "../Line";
import Link from "../Link";
import Text from "../Text";
import Truncate from "../Truncate";

const socialIcons: Record<string, FC> = {
  website: Website,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  behance: Behance,
  foundation: Foundation,
};

interface Props extends HTMLAttributes<HTMLElement> {
  withoutName?: boolean;
  withLine?: boolean;
  moreLink?: string;
  artist?: GQL.Artist;
  vertical?: boolean;
  fullArtist?: boolean;
  truncate?: number;
}

const Quote: FC<Props> = ({
  withoutName,
  children,
  withLine,
  moreLink,
  artist,
  vertical,
  fullArtist,
  truncate,
  ...props
}) => {
  return (
    <div {...props}>
      {withLine && <Line css={{ marginTop: 0 }} spacing={6} />}
      <div
        style={{
          display: "flex",
          ...(vertical ? { flexDirection: "column" } : {}),
        }}
      >
        <div>
          {truncate ? (
            <Truncate lines={truncate} variant="body3" css={{ marginTop: 0 }}>
              {children}
            </Truncate>
          ) : (
            <Text css={{ margin: 0 }} variant="body3">
              {children}
            </Text>
          )}

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
              <Arrowed>Read more</Arrowed>
            </Text>
          )}
        </div>
        {artist && (
          <div
            key={artist.info}
            css={(theme) => ({
              ...(vertical
                ? {}
                : {
                    marginLeft: theme.spacing(13.5),
                    width: theme.spacing(22.5),
                    flexShrink: 0,
                  }),
            })}
          >
            {vertical && <Line spacing={4} />}
            <div css={{ display: "flex", alignItems: "top" }}>
              {fullArtist && (
                <div
                  css={(theme) => ({
                    width: theme.spacing(7.5),
                    height: theme.spacing(7.5),
                    backgroundImage: `url(${artist.userpic})`,
                    backgroundSize: "cover",
                    borderRadius: "50%",
                    marginRight: theme.spacing(3),
                    flexShrink: 0,
                  })}
                />
              )}
              <div>
                {!withoutName && (
                  <Text
                    variant="h5"
                    css={(theme) => ({
                      marginTop: theme.spacing(1.2),
                      marginBottom: theme.spacing(1.2),
                    })}
                  >
                    {artist.name}
                  </Text>
                )}
                {fullArtist && (
                  <Truncate
                    variant="body2"
                    lines={2}
                    css={{
                      marginTop: 0,
                      opacity: 0.5,
                    }}
                  >
                    {artist.info}
                  </Truncate>
                )}
                <div
                  css={(theme) => ({
                    display: "flex",
                    gap: theme.spacing(2),
                    marginTop: theme.spacing(3),
                  })}
                >
                  {Object.entries(artist.social).map(([key, value]) => {
                    const Icon = socialIcons[key];

                    if (!Icon || !value) {
                      return null;
                    }

                    return (
                      <Link
                        key={key}
                        href={value}
                        target="_blank"
                        css={{ alignSelf: "center", opacity: 0.2 }}
                      >
                        <Icon />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quote;
