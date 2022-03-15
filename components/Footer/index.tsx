import { FC, HTMLAttributes } from "react";
import Link from "../Link";
import Discord from "../Icons/Discord";
import Youtube from "../Icons/Youtube";
import Pinterest from "../Icons/Pinterest";
import Text from "../Text";
import Chevron from "../Icons/Chevron";
import Button from "../Button";
import Line from "../Line";
import Grid from "../Grid";

const Footer: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      {...props}
      css={(theme) => ({
        background: theme.colors.page_bg_light_gray,
        color: theme.colors.text_subtitle_dark,
        borderRadius: theme.spacing(1),
      })}
    >
      <Grid>
        {[
          [
            {
              label: "Home",
              href: "/",
            },
            {
              label: "About",
              href: "/",
            },
            {
              label: "PA NFT",
              href: "/",
            },
            {
              label: "Kickstarter",
              href: "/",
            },
          ],
          [
            {
              label: "Store",
              href: "/",
            },
            {
              label: "Reviews",
              href: "/",
            },
            {
              label: "Gallery",
              href: "/",
            },
            {
              label: "Press",
              href: "/",
            },
          ],
          [
            {
              label: "Press",
              href: "/",
            },
            {
              label: "Reviews",
              href: "/",
            },
            {
              label: "Contact",
              href: "/",
            },
          ],
        ].map((menu, index) => (
          <ul
            key={index}
            css={(theme) => ({
              display: "flex",
              flexDirection: "column",
              rowGap: theme.spacing(1.5),
              padding: 0,
              listStyle: "none",
              margin: 0,
              gridColumn: "span 2",
            })}
          >
            {menu.map(({ label, href }) => (
              <Text variant="body2" component="li" key={label}>
                <Link href={href}>{label}</Link>
              </Text>
            ))}
          </ul>
        ))}
        <form
          css={{
            gridColumn: "9 / span 4",
          }}
        >
          <Text component="h2" variant="h6">
            Project news
          </Text>
          <div
            css={(theme) => ({
              display: "flex",
              background: "rgba(0, 0, 0, 0.05)",
              borderRadius: theme.spacing(1),
              marginTop: theme.spacing(1.5),
            })}
          >
            <input
              type="email"
              placeholder="Your email"
              css={(theme) => ({
                fontSize: 22,
                paddingLeft: theme.spacing(2),
                height: theme.spacing(5),
                flexGrow: 1,
              })}
            />
            <Button
              type="submit"
              Icon={Chevron}
              iconProps={{
                css: (theme) => ({
                  height: theme.spacing(2),
                  width: theme.spacing(1),
                }),
              }}
            />
          </div>
          <Text
            variant="body0"
            css={{
              marginBottom: 0,
            }}
          >
            We will never share your details with others. Unsubscribe at any
            time.
          </Text>
        </form>
      </Grid>

      <Line spacing={3} />

      <Grid>
        <div css={{ gridColumn: "span 6", opacity: 0.5 }}>
          <Text variant="h6" component="h2" css={{ margin: 0 }}>
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
            © 2012—2021 Digital Abstracts SL Privacy statement Patent Pending
          </Text>
        </div>
        <nav
          css={{
            display: "flex",
            gridColumn: "9 / span 4",
          }}
        >
          {[
            {
              Icon: Discord,
              href: "discort",
            },
            {
              Icon: Pinterest,
              href: "pinterest",
            },
            {
              Icon: Youtube,
              href: "youtube",
            },
          ].map(({ Icon, href }) => (
            <Button
              key={href}
              component={Link}
              href={href}
              Icon={Icon}
              css={{ opacity: 0.5 }}
            />
          ))}
        </nav>
      </Grid>
    </div>
  );
};

export default Footer;
