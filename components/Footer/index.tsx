import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { breakpoints } from "../../source/enums";
import Grid from "../Grid";
import Layout from "../Layout";
import Line from "../Line";
import Link from "../Link";
import { useSize } from "../SizeProvider";
import Text from "../Text";
import ModalMenu from "../_composed/ModalMenu";

const Footer: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const lineRef = useRef<HTMLHRElement>(null);

  const ref = useRef<HTMLElement>(null);
  //todo rethink sticky logic

  const { width } = useSize();

  const [_, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      css={(theme) => [
        ref.current && {
          position: "relative",
          [theme.mq.sm]: {
            zIndex: 0,
            height: ref.current.clientHeight,
          },
        },
      ]}
      {...props}
    >
      <div
        css={(theme) => [
          ref.current &&
            lineRef.current && {
              width: "100%",
              background: theme.colors.page_bg_dark,
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              [theme.mq.sm]: {
                top: -lineRef.current.offsetTop,
                position: "absolute",
              },
            },
        ]}
      >
        {width >= breakpoints.sm && (
          <div
            css={[
              lineRef.current && {
                height: lineRef.current.offsetTop,
              },
            ]}
          />
        )}
        <Layout
          ref={ref}
          css={(theme) => [
            {
              width: "100%",

              paddingTop: theme.spacing(6),
              paddingBottom: theme.spacing(3),
              [theme.mq.sm]: [
                lineRef.current &&
                  ref.current && {
                    bottom:
                      lineRef.current.offsetTop - ref.current.clientHeight,
                  },

                {
                  position: "sticky",
                },
              ],
              [theme.maxMQ.sm]: {
                paddingTop: theme.spacing(4),
                paddingBottom: theme.spacing(4),
              },
              // borderRadius: theme.spacing(1),
            },
          ]}
        >
          <Grid>
            <div
              css={(theme) => [
                {
                  display: "flex",
                  gap: theme.spacing(2),
                  [theme.mq.sm]: {
                    alignItems: "center",
                    gap: theme.spacing(4),
                  },
                  flexDirection: "column",
                  gridColumn: "1/-1",
                },
              ]}
            >
              <ModalMenu
                css={(theme) => [
                  {
                    paddingTop: theme.spacing(1.5),
                    paddingBottom: theme.spacing(1),
                  },
                ]}
              />
              {/* <div
                css={(theme) => [
                  {
                    [theme.maxMQ.sm]: {
                      flexDirection: "column",
                    },
                    [theme.mq.sm]: {
                      display: "flex",
                    },
                  },
                ]}
              >
                {[
                  { href: "/", text: "Home" },

                  { href: "/shop", text: "Shop" },

                  {
                    href: "/shop?scrollIntoView=%5Bdata-id%3D%27faq%27%5D&scrollIntoViewBehavior=smooth&scrollIntoViewPosition=start",
                    text: "Shipping",
                  },

                  {
                    href: "https://play2.playingarts.com/",
                    text: "Game",
                  },

                  {
                    href: "https://www.youtube.com/playlist?list=PLhr51fAv2oZrgD0MreHVp8m9fdb7ETF4L",
                    target: "_blank",
                    text: "Podcast",
                  },
                  {
                    href: "https://landing.mailerlite.com/webforms/landing/n4m6r2",
                    target: "_blank",
                    text: "News",
                  },

                  // { href: "/", text: "Gallery" },

                  { href: "/contact", text: "Contact" },
                ]
                  .filter(
                    (
                      item
                    ): item is
                      | {
                          href: string;
                          text: string;
                          target?: undefined;
                        }
                      | {
                          href: string;
                          target: string;
                          text: string;
                        } => !!item
                  )
                  .map(({ href, text, target }) => (
                    <Link
                      key={text}
                      href={href}
                      {...(target && { target })}
                      css={(theme) => [
                        theme.typography.label,
                        {
                          padding: `${theme.spacing(1.4)}px ${theme.spacing(
                            0
                          )}px`,
                          color: "rgba(255,255,255,0.7)",
                          width: "50%",
                          float: "left",
                          fontWeight: 600,
                          textTransform: "uppercase",

                          [theme.mq.sm]: {
                            padding: `${theme.spacing(1.4)}px ${theme.spacing(
                              2
                            )}px`,
                            transition: theme.transitions.slow("color"),
                            "&:hover": {
                              color: theme.colors.white,
                            },
                          },
                        },
                      ]}
                    >
                      {text}
                    </Link>
                  ))}
              </div>
              <div
                css={(theme) => [
                  {
                    flexWrap: "wrap",
                    color: colord(theme.colors.white).alpha(0.2).toRgbString(),
                    alignItems: "center",
                    [theme.maxMQ.sm]: {
                      gap: theme.spacing(8),
                    },
                    [theme.mq.sm]: {
                      height: theme.spacing(6),
                      display: "flex",
                      gap: theme.spacing(1),
                    },
                  },
                ]}
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
                    css={(theme) => [
                      {
                        [theme.maxMQ.sm]: {
                          marginRight: theme.spacing(0.5),
                          marginBottom: theme.spacing(1),
                        },
                        [theme.mq.sm]: {
                          transition: theme.transitions.slow("all"),
                          "&:hover": {
                            color: "rgba(255, 255, 255, 0.5)",
                          },
                        },
                      },
                    ]}
                    key={href}
                    component={Link}
                    target="_blank"
                    href={href}
                    Icon={Icon}
                  />
                ))}
              </div>
              <StoreButtons
                css={(theme) => ({
                  color: colord(theme.colors.white).alpha(0.2).toRgbString(),
                })}
                ButtonProps={{
                  variant: "bordered",
                }}
              /> */}
              <Line
                ref={lineRef}
                spacing={0}
                palette="dark"
                css={{ width: "100%" }}
              />
              {/* <div
                css={{
                  color: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  flexDirection: "column",
                  gap: theme.spacing(1),
                  alignItems: "center",
                }}
              >
                <Text variant="label" css={{ margin: 0 }}>
                  Funded with
                </Text>
                <KickstarterLogo />
              </div> */}
              <Text
                variant="body0"
                css={(theme) => [
                  {
                    margin: 0,
                    color: "rgba(255, 255, 255, 0.15)",
                    // maxWidth: theme.spacing(81),
                    textAlign: "center",
                    fontSize: 14,
                    [theme.maxMQ.sm]: {
                      textAlign: "left",
                      fontSize: 11,
                    },
                  },
                ]}
              >
                © 2012—2024 Digital Abstracts SL. Any artwork displayed on this
                website may not be reproduced or used in any manner whatsoever
                without the express written permission of Digital Abstracts or
                their respective owners. Patent Pending. We use cookies and
                similar technologies for statistics and marketing purposes.{" "}
                <Link
                  css={(theme) => [
                    {
                      color: "rgba(255, 255, 255, 0.25)",
                      transition: theme.transitions.slow("all"),
                      "&:hover": {
                        color: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                  ]}
                  href="/privacy"
                >
                  Privacy Statement
                </Link>
              </Text>
            </div>
          </Grid>
        </Layout>
      </div>
    </div>
  );
};

export default Footer;
