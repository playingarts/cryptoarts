import { colord } from "colord";
import { useMetaMask } from "metamask-react";
import { FC, Fragment, HTMLAttributes } from "react";
import { socialLinks } from "../../source/consts";
import { breakpoints } from "../../source/enums";
import Button from "../Button";
import Grid from "../Grid";
import Behance from "../Icons/Behance";
import Discord from "../Icons/Discord";
import Facebook from "../Icons/Facebook";
import Instagram from "../Icons/Instagram";
import Pinterest from "../Icons/Pinterest";
import Twitter from "../Icons/Twitter";
import Youtube from "../Icons/Youtube";
import Line from "../Line";
import Link from "../Link";
import MetamaskButton from "../MetamaskButton";
import { useSize } from "../SizeProvider";
import StoreButtons from "../StoreButtons";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLDivElement> {
  copyrightLast?: boolean;
  palette?: "dark";
  reverseMobile?: boolean;
  noCopyright?: boolean;
  showNav?: boolean;
}

const Footer: FC<Props> = ({
  copyrightLast,
  showNav,
  reverseMobile,
  palette,
  noCopyright,
  children,
  ...props
}) => {
  const { status } = useMetaMask();

  const { width } = useSize();

  return (
    <Grid
      {...props}
      css={(theme) => [
        {
          color:
            palette === "dark"
              ? colord(theme.colors.text_subtitle_light)
                  .alpha(0.25)
                  .toRgbString()
              : colord(theme.colors.text_subtitle_dark)
                  .alpha(0.25)
                  .toRgbString(),
        },
      ]}
    >
      {children}

      {!noCopyright && (
        <div
          css={(theme) => [
            {
              gridColumn: "1 / -1",
              [theme.mq.sm]: {
                [theme.maxMQ.md]: {
                  gridColumn: "span 4",
                },
              },
              [theme.mq.md]: {
                gridColumn: "span 7",
              },
            },
            copyrightLast && { order: 1 },
          ]}
        >
          <Text
            component="h6"
            css={(theme) => ({
              margin: 0,
              fontSize: theme.spacing(2),
              lineHeight: 1,
              [theme.mq.sm]: {
                fontSize: theme.spacing(2.3),
              },
            })}
          >
            playing arts project
          </Text>
          <Text variant="body0">
            All rights reserved. Any artwork displayed on this website may not
            be reproduced or used in any manner whatsoever without the express
            written permission of Digital Abstracts or their respective owners.
          </Text>
          <Text
            variant="body0"
            css={{
              marginBottom: 0,
            }}
          >
            © 2012—2022 Digital Abstracts SL{" "}
            <Link href="/privacy"> Privacy Statement</Link> Patent Pending
          </Text>
        </div>
      )}
      {width >= breakpoints.sm && (
        <Line {...{ palette }} vertical={true} spacing={0} />
      )}
      <Grid
        auto={true}
        css={(theme) => [
          {
            gridColumn: "span 4",
            [theme.maxMQ.sm]: {
              gridColumn: "1/-1",
            },
          },
        ]}
      >
        {(showNav || width < breakpoints.sm) && (
          <Fragment>
            <nav
              css={(theme) => [
                {
                  gridColumn: "1/-1",
                  height: "fit-content",
                  [theme.mq.sm]: {
                    gridColumn: "span 4",
                  },
                  marginBottom: theme.spacing(2.5),
                },
              ]}
            >
              <Grid
                auto={true}
                css={(theme) => [
                  {
                    rowGap: theme.spacing(1),
                    [theme.maxMQ.sm]: {
                      maxWidth: theme.spacing(32),
                      margin: "auto",
                    },
                  },
                ]}
              >
                {[
                  { href: "/", text: "Home" },
                  { href: "/shop", text: "Store" },
                  { href: "/contact", text: "Contact" },
                ].map(({ href, text }) => (
                  <Link
                    key={text}
                    href={href}
                    css={(theme) => [
                      theme.typography.body,
                      {
                        gridColumn: "span 3",
                        [theme.mq.sm]: {
                          gridColumn: "span 2",
                        },
                      },
                    ]}
                  >
                    {text}
                  </Link>
                ))}
              </Grid>
              {width >= breakpoints.sm && (
                <Line
                  {...{ palette }}
                  spacing={4}
                  css={[{ width: "100%", gridColumn: "1/-1" }]}
                />
              )}
            </nav>
          </Fragment>
        )}

        <nav
          css={(theme) => ({
            display: "flex",
            flexWrap: "wrap",
            gridColumn: "1 / -1",
            [theme.maxMQ.sm]: [
              !reverseMobile && {
                order: -1,
              },
              {
                justifyContent: "center",
                // gap: theme.spacing(1.8),
              },
            ],
            [theme.mq.sm]: {
              // gap: theme.spacing(2),
              gridColumn: "span 4",
            },
          })}
        >
          <div
            css={(theme) => ({
              display: "flex",
              flexWrap: "wrap",
              [theme.maxMQ.sm]: {
                gap: theme.spacing(1.8),
              },
              [theme.mq.sm]: {
                gap: theme.spacing(2),
                gridColumn: "span 4",
              },
            })}
          >
            {[
              {
                Icon: Twitter,
                href: socialLinks.twitter,
              },
              {
                Icon: Instagram,
                href: socialLinks.instagram,
              },
              {
                Icon: Facebook,
                href: socialLinks.facebook,
              },
              {
                Icon: Behance,
                href: socialLinks.behance,
              },
              {
                Icon: Youtube,
                href: socialLinks.youtube,
              },
              {
                Icon: Pinterest,
                href: socialLinks.pinterest,
              },
              {
                Icon: Discord,
                href: socialLinks.discord,
              },
            ].map(({ Icon, href }) => (
              <Button
                css={(theme) => ({
                  width: theme.spacing(3) + "px !important",
                  height: theme.spacing(3) + "px !important",
                })}
                key={href}
                component={Link}
                target="_blank"
                href={href}
                Icon={Icon}
              />
            ))}
          </div>
          {width < breakpoints.sm && (
            <Fragment>
              <Line
                palette={palette}
                css={[
                  {
                    gridColumn: "1 / -1",

                    width: "100%",
                  },
                ]}
                spacing={3}
              />

              {status !== "connected" && (
                <MetamaskButton
                  noIcon={true}
                  textColor={
                    palette === "dark" ? "transparent" : "text_title_light"
                  }
                  backgroundColor={
                    palette === "dark" ? "dark_gray" : "text_subtitle_dark"
                  }
                  css={(theme) => [
                    {
                      width: "100%",
                      marginBottom: theme.spacing(2.5),
                    },
                    palette !== "dark" && {
                      opacity: 0.5,
                    },
                  ]}
                  centeredText={true}
                >
                  <span
                    css={(theme) => [
                      palette === "dark" && {
                        color: "transparent",
                        background: theme.colors.eth,
                        backgroundClip: "text",
                      },
                    ]}
                  >
                    Connect metamask
                  </span>
                </MetamaskButton>
              )}
            </Fragment>
          )}
          <StoreButtons
            css={{
              alignSelf: "flex-end",
            }}
            ButtonProps={{
              variant: "bordered",
            }}
          />
          {width < breakpoints.sm && (
            <Line
              {...{ palette }}
              css={{
                gridColumn: "1 / -1",
                width: "100%",
              }}
              spacing={3}
            />
          )}
        </nav>
      </Grid>
    </Grid>
  );
};

export default Footer;
