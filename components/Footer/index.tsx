import { FC, HTMLAttributes } from "react";
import Grid from "../Grid";
import ScandiBlock from "../ScandiBlock";
import Text from "../Text";
import ButtonTemplate from "../Buttons/Button";
import Apple from "../Icons/Apple";
import Android from "../Icons/Android";
import ArrowButton from "../Buttons/ArrowButton";
import Link from "../Link";
import { usePalette } from "../Pages/Deck/DeckPaletteContext";
import { useAuth } from "../Contexts/auth";

export type FooterLink = {
  label: string;
  href: string;
};

export const links: { [key: string]: FooterLink[] } = {
  "The project": [
    { label: "Home", href: "/" },
    { label: "AR app", href: "/ar" },
    { label: "Gallery", href: "/gallery" },
    { label: "Press", href: "/press" },
  ],
  "Shop & help": [
    { label: "Shop", href: "/shop" },
    { label: "Reviews", href: "/reviews" },
    { label: "Shipping", href: "/shop#faq" },
    { label: "Contact", href: "/contact" },
  ],
  Community: [
    { label: "Artists", href: "/artists" },
    { label: "Participate", href: "/participate" },
    { label: "Kickstarter", href: "/kickstarter" },
    { label: "Podcast", href: "/podcast" },
  ],
};

const Footer: FC<HTMLAttributes<HTMLElement>> = (props) => {
  const { palette } = usePalette();
  const { isAdmin, logout } = useAuth();

  return (
    <Grid
      css={(theme) => [
        {
          background:
            theme.colors[palette === "dark" ? "spaceBlack" : "pale_gray"],
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
          [theme.maxMQ.xsm]: {
            gridTemplateColumns: "repeat(6, 1fr)",
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
          },
        },
      ]}
    >
      <ScandiBlock
        opacity={0.3}
        css={(theme) => [
          {
            gridColumn: "span 6",
            paddingTop: 15,
            alignItems: "start",
            flexDirection: "column",
            justifyContent: "space-between",
            [theme.maxMQ.sm]: {
              gridColumn: "1 / -1",
              marginBottom: theme.spacing(3),
            },
            [theme.maxMQ.xsm]: {
              marginBottom: theme.spacing(6),
            },
          },
        ]}
      >
        <div>
          <Text
            typography="linkNewTypography"
            css={(theme) => [
              { color: theme.colors[palette === "dark" ? "white50" : "black50"] },
            ]}
          >
            Download Playing Arts AR™ app
          </Text>
          <div css={(theme) => [{ marginTop: theme.spacing(3), display: "flex", flexWrap: "wrap", gap: theme.spacing(1.5) }]}>
            <a
              href="https://apps.apple.com/es/app/playing-arts/id1594901668?l=en"
              target="_blank"
              rel="noopener noreferrer"
              css={{ textDecoration: "none" }}
            >
              <ButtonTemplate
                size="medium"
                css={(theme) => ({
                  paddingLeft: 10,
                  color: palette === "dark" ? theme.colors.spaceBlack : undefined,
                })}
                color={palette === "dark" ? "white50" : undefined}
                palette={palette}
              >
                <Apple
                  css={{
                    marginRight: 10,
                  }}
                />
                iPhone
              </ButtonTemplate>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.digitalabstractsapps.playingarts&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              css={{ textDecoration: "none" }}
            >
              <ButtonTemplate
                color={palette === "dark" ? "white50" : undefined}
                size="medium"
                css={(theme) => ({
                  paddingLeft: 10,
                  color: palette === "dark" ? theme.colors.spaceBlack : undefined,
                })}
                palette={palette}
              >
                <Android
                  css={{
                    marginRight: 10,
                  }}
                />
                Android
              </ButtonTemplate>
            </a>
          </div>
        </div>
        <Text
          typography="paragraphMicro"
          css={(theme) => [
            {
              marginTop: "auto",
              paddingTop: 90,
              a: {
                textDecoration: "underline",
                color: theme.colors[palette === "dark" ? "white" : "black"],
              },
              color: theme.colors[palette === "dark" ? "white" : "black"],
              opacity: 0.5,
              maxWidth: 520,
              [theme.maxMQ.xsm]: {
                display: "none",
              },
            },
          ]}
        >
          © 2012—2026 Digital Abstracts SL. Any artwork displayed on this
          website may not be reproduced or used in any manner whatsoever
          without the express written permission of Digital Abstracts or their
          respective owners. Patent Pending. Thanks for reading this, bye!
          <br />
          <br />
          <a css={[{ textDecoration: "underline", marginRight: 15 }]} href="">
            Privacy Statement
          </a>
          <a css={[{ textDecoration: "underline" }]} href="">
            Terms of Service
          </a>
        </Text>
      </ScandiBlock>

      {Object.keys(links).map((key) => (
        <ScandiBlock
          key={key + "Footer"}
          opacity={0.3}
          css={(theme) => [
            {
              gridColumn: "span 2",
              paddingTop: 15,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "start",
              [theme.maxMQ.sm]: {
                gridColumn: "span 2", // 2 of 6 on tablet
              },
              [theme.maxMQ.xsm]: {
                gridColumn: "span 2 !important",
              },
            },
          ]}
        >
          <Text
            typography="linkNewTypography"
            css={(theme) => [
              {
                color: theme.colors[palette === "dark" ? "white50" : "black50"],
              },
            ]}
          >
            {key}
          </Text>
          <div css={(theme) => [{ marginTop: theme.spacing(3), display: "grid", gap: 5 }]}>
            {links[key].map((item) => (
              <Link
                key={item.label + "Link"}
                href={item.href}
                css={[{ display: "block" }]}
              >
                <ArrowButton
                  noColor={true}
                  base={true}
                  size="small"
                  css={(theme) => [
                    {
                      textAlign: "start",
                      color:
                        theme.colors[
                          palette === "dark" ? "white50" : "black50"
                        ],
                      transition: theme.transitions.fast("color"),
                      "&:hover": {
                        color: theme.colors[palette === "dark" ? "white" : "black"],
                      },
                      [theme.maxMQ.xsm]: {
                        fontSize: 16, // linkNewTypography mobile size
                      },
                    },
                  ]}
                >
                  {item.label}
                </ArrowButton>
              </Link>
            ))}
            {/* Admin logout link - only in "The project" section */}
            {isAdmin && key === "The project" && (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                css={[{ display: "block" }]}
              >
                <ArrowButton
                  noColor={true}
                  base={true}
                  size="small"
                  css={(theme) => [
                    {
                      textAlign: "start",
                      color: theme.colors[palette === "dark" ? "white50" : "black50"],
                      transition: theme.transitions.fast("color"),
                      "&:hover": {
                        color: theme.colors[palette === "dark" ? "white" : "black"],
                      },
                    },
                  ]}
                >
                  Log out
                </ArrowButton>
              </a>
            )}
          </div>
        </ScandiBlock>
      ))}

      {/* Mobile-only copyright at the very end */}
      <Text
        typography="paragraphMicro"
        css={(theme) => [
          {
            display: "none",
            [theme.maxMQ.xsm]: {
              display: "block",
              gridColumn: "1 / -1",
              marginTop: theme.spacing(3),
              fontSize: 10,
              a: {
                textDecoration: "underline",
                color: theme.colors[palette === "dark" ? "white" : "black"],
              },
              color: theme.colors[palette === "dark" ? "white" : "black"],
              opacity: 0.5,
            },
          },
        ]}
      >
        © 2012—2026 Digital Abstracts SL. Any artwork displayed on this
        website may not be reproduced or used in any manner whatsoever
        without the express written permission of Digital Abstracts or their
        respective owners. Patent Pending. Thanks for reading this, bye!
        <br />
        <br />
        <a css={[{ textDecoration: "underline", marginRight: 15 }]} href="">
          Privacy Statement
        </a>
        <a css={[{ textDecoration: "underline" }]} href="">
          Terms of Service
        </a>
      </Text>
    </Grid>
  );
};

export default Footer;
