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

const Footer: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { status } = useMetaMask();

  const { width } = useSize();

  return (
    <Grid {...props}>
      <div
        css={(theme) => ({
          gridColumn: "1 / -1",
          [theme.mq.sm]: {
            [theme.maxMQ.md]: {
              gridColumn: "span 4",
            },
          },
          [theme.mq.md]: {
            gridColumn: "span 7",
          },
          opacity: 0.5,
          color: theme.colors.text_subtitle_dark,
        })}
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
          All rights reserved. Any artwork displayed on this website may not be
          reproduced or used in any manner whatsoever without the express
          written permission of Digital Abstracts or their respective owners.
        </Text>
        <Text
          variant="body0"
          css={{
            marginBottom: 0,
          }}
        >
          © 2012—2021 Digital Abstracts SL Privacy statement Patent Pending
        </Text>
      </div>

      {width >= breakpoints.sm && (
        <Line
          css={(theme) => ({
            color: theme.colors.black,
          })}
          vertical={true}
          spacing={0}
        />
      )}
      <nav
        css={(theme) => ({
          display: "flex",
          flexWrap: "wrap",
          color: theme.colors.text_subtitle_dark,
          opacity: 0.5,
          gridColumn: "1 / -1",
          [theme.maxMQ.sm]: {
            justifyContent: "center",
            order: -1,
            // gap: theme.spacing(1.8),
          },
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
              css={(theme) => ({
                gridColumn: "1 / -1",
                width: "100%",
                color: theme.colors.black,
              })}
              spacing={3}
            />

            {status !== "connected" && (
              <MetamaskButton
                noIcon={true}
                textColor="text_title_light"
                backgroundColor="text_title_light"
                css={(theme) => [
                  {
                    backgroundColor: theme.colors.text_subtitle_dark,
                    "&:hover": {
                      backgroundColor: theme.colors.text_subtitle_dark,
                    },
                    width: "100%",
                    marginBottom: theme.spacing(2.5),
                  },
                ]}
                centeredText={true}
              >
                Connect metamask
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
            css={(theme) => ({
              gridColumn: "1 / -1",
              width: "100%",
              color: theme.colors.black,
            })}
            spacing={3}
          />
        )}
      </nav>
    </Grid>
  );
};

export default Footer;
