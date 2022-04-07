import { FC, HTMLAttributes } from "react";
import Link from "../Link";
import Discord from "../Icons/Discord";
import Youtube from "../Icons/Youtube";
import Pinterest from "../Icons/Pinterest";
import Text from "../Text";
import Button from "../Button";
import Line from "../Line";
import Grid from "../Grid";
import Twitter from "../Icons/Twitter";
import { socialLinks } from "../../source/consts";
import Instagram from "../Icons/Instagram";
import Facebook from "../Icons/Facebook";
import Behance from "../Icons/Behance";
import StoreButtons from "../StoreButtons";

const Footer: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
  <div
    {...props}
    css={(theme) => ({
      background: theme.colors.page_bg_light_gray,
      borderRadius: theme.spacing(1),
    })}
  >
    <Grid>
      <div
        css={(theme) => ({
          gridColumn: "span 7",
          opacity: 0.5,
          color: theme.colors.text_subtitle_dark,
        })}
      >
        <Text variant="h6" component="h2" css={{ margin: 0 }}>
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
      <Line vertical={true} spacing={0} />
      <nav
        css={(theme) => ({
          display: "flex",
          flexWrap: "wrap",
          gridColumn: "span 4",
          color: theme.colors.text_subtitle_dark,
          opacity: 0.5,
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
            key={href}
            component={Link}
            target="_blank"
            href={href}
            Icon={Icon}
          />
        ))}
        <StoreButtons
          css={{ alignSelf: "flex-end" }}
          ButtonProps={{
            variant: "bordered",
          }}
        />
      </nav>
    </Grid>
  </div>
);

export default Footer;
