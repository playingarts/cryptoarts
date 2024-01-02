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
import { useSize } from "../SizeProvider";
import { breakpoints } from "../../source/enums";

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
  withoutUserPic?: boolean;
  truncate?: number;
  palette?: "dark" | "light";
  cardList?: boolean;
  artistOnTopMobile?: boolean;
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
  palette,
  withoutUserPic,
  cardList,
  artistOnTopMobile,
  ...props
}) => {
  const { width } = useSize();

  const ArtistBlock = artist && (
    <div
      key={artist.info}
      css={(theme) => ({
        ...(vertical
          ? {}
          : {
              marginLeft: theme.spacing(13.5),
              minWidth: theme.spacing(18),

              flexShrink: 0,
            }),
      })}
    >
      {!withoutUserPic && children && !cardList && (
        <Line
          spacing={0}
          palette={palette}
          css={(theme) => [
            {
              marginBottom: theme.spacing(3),
              [theme.maxMQ.sm]: {
                marginBottom: theme.spacing(3),
                marginTop: theme.spacing(2.5),
              },
            },
          ]}
        />
      )}

      <div
        css={(theme) => [
          { display: "flex", alignItems: "top" },
          cardList && {
            marginTop: theme.spacing(1.5),
            [theme.mq.sm]: {
              flexDirection: "column",
            },
            [theme.mq.md]: {
              width: theme.spacing(20),
            },
          },
        ]}
      >
        {((fullArtist && !withoutUserPic) || cardList) && (
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
        <div
          css={(theme) => [
            artistOnTopMobile && {
              [theme.maxMQ.sm]: {
                display: "flex",
                alignItems: "center",
              },
            },
          ]}
        >
          {!withoutName && (
            <Text
              variant="h5"
              css={(theme) => [
                {
                  marginTop: theme.spacing(1.2),
                  marginBottom: theme.spacing(1.2),
                },
                cardList && {
                  [theme.mq.sm]: {
                    fontSize: 20,
                  },
                },
                artistOnTopMobile && {
                  [theme.maxMQ.sm]: {
                    fontSize: 20,
                  },
                },
              ]}
            >
              {artist.name}
            </Text>
          )}
          {fullArtist && (
            <Truncate
              onlyMore={true}
              variant="body2"
              lines={2}
              css={[
                {
                  marginTop: 0,
                  marginBottom: 0,
                },
              ]}
            >
              {artist.info}
            </Truncate>
          )}
          {!cardList && (
            <div
              css={(theme) => [
                {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: theme.spacing(1.5),
                  marginTop: theme.spacing(3),
                },
              ]}
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
                    css={(theme) => [
                      {
                        alignSelf: "center",
                        opacity: 0.2,
                        color: theme.colors.white,
                        [theme.mq.sm]: {
                          transition: theme.transitions.slow("opacity"),
                          "&:hover": {
                            opacity: 1,
                          },
                        },
                      },
                    ]}
                  >
                    <Icon />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div {...props}>
      {withLine && (
        <Line palette={palette} css={{ marginTop: 0 }} spacing={6} />
      )}
      <div
        style={{
          display: "flex",
          ...(vertical ? { flexDirection: "column" } : {}),
        }}
      >
        {/* Card quote Block */}

        {artistOnTopMobile && width < breakpoints.sm && ArtistBlock}

        {children && (
          <div
            css={(theme) => ({
              marginBottom: theme.spacing(3),

              [theme.maxMQ.md]: {
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(3),
              },
              [theme.maxMQ.sm]: {
                marginTop: theme.spacing(0),
                marginBottom: theme.spacing(0),
              },
            })}
          >
            {truncate ? (
              <Truncate
                onlyMore={true}
                lines={truncate}
                variant="body3"
                css={(theme) => [
                  {
                    margin: 0,
                    color: cardList
                      ? "inherit"
                      : palette === "light"
                      ? theme.colors.black
                      : theme.colors.white,
                    [theme.maxMQ.sm]: { marginTop: theme.spacing(3) },
                  },
                ]}
              >
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
        )}

        {/* Artist info Block */}
        {(!artistOnTopMobile ||
          (artistOnTopMobile && width >= breakpoints.sm)) &&
          ArtistBlock}
      </div>
    </div>
  );
};

export default Quote;
