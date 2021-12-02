import { FC, HTMLAttributes } from "react";
import Link from "../Link";
import Discord from "../Icons/Discord";
import Youtube from "../Icons/Youtube";
import Pinterest from "../Icons/Pinterest";
import Title from "../Title";
import Arrow from "../Icons/Arrow";
import Button from "../Button";

const Footer: FC<HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <div {...props}>
      <div
        css={{
          display: "flex",
          color: "rgba(10, 10, 10, 0.5)",
        }}
      >
        <nav
          css={{
            flexGrow: 1,
            display: "flex",
            fontSize: 22,
          }}
        >
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
                width: "33.33%",
              })}
            >
              {menu.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} css={{ color: "inherit" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>
        <form
          css={(theme) => ({
            width: theme.spacing(40),
            marginLeft: theme.spacing(24),
          })}
        >
          <Title
            component="h2"
            css={{ fontSize: 18, textTransform: "uppercase" }}
          >
            Project news
          </Title>
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
              Icon={Arrow}
              iconProps={{
                css: (theme) => ({
                  height: theme.spacing(2),
                  width: theme.spacing(1),
                }),
              }}
            />
          </div>
          <p
            css={(theme) => ({
              fontSize: 14,
              lineHeight: 1.3,
              margin: 0,
              marginTop: theme.spacing(2),
            })}
          >
            We will never share your details with others. Unsubscribe at any
            time.
          </p>
        </form>
      </div>
      <div
        css={(theme) => ({
          paddingTop: theme.spacing(4),
          marginTop: theme.spacing(7),
          borderTop: "2px solid rgba(0, 0, 0, 0.1)",
          color: "rgba(0, 0, 0, 0.25)",
          fontSize: 14,
          display: "flex",
        })}
      >
        <div css={{ flexGrow: 1 }}>
          <Title
            css={(theme) => ({
              textTransform: "uppercase",
              fontSize: 20,
              marginBottom: theme.spacing(2),
            })}
          >
            playing arts project
          </Title>
          <p>
            All rights reserved. Any artwork displayed on this website may not
            be reproduced or used in any manner whatsoever without the express
            written permission of Digital Abstracts or their respective owners.
          </p>
          <p>
            © 2012—2021 Digital Abstracts SL Privacy statement Patent Pending
          </p>
        </div>
        <nav
          css={(theme) => ({
            display: "flex",
            width: theme.spacing(40),
            marginLeft: theme.spacing(24),
            flexShrink: 0,
          })}
        >
          {[
            {
              Icon: Discord,
              href: "/",
            },
            {
              Icon: Pinterest,
              href: "/",
            },
            {
              Icon: Youtube,
              href: "/",
            },
          ].map(({ Icon, href }) => (
            <Button key={href} component={Link} href={href} Icon={Icon} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Footer;
