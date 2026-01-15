import { FC, HTMLAttributes } from "react";
import dynamic from "next/dynamic";
import Grid from "../Grid";
import ScandiBlock from "../ScandiBlock";
import ArrowedButton from "../Buttons/ArrowedButton";
import Text from "../Text";
import NewLink from "../Link/NewLink";

// Lazy load EmailForm to reduce initial bundle (includes react-hook-form ~23kB)
const EmailForm = dynamic(() => import("../EmailForm"), {
  ssr: false,
  loading: () => <div css={{ height: 55 }} />,
});
import Instagram from "../Icons/Instagram";
import Twitter from "../Icons/Twitter";
import Youtube from "../Icons/Youtube";
import { socialLinks } from "../../source/consts";
import ButtonTemplate from "../Buttons/Button";
import Apple from "../Icons/Apple";
import Android from "../Icons/Android";
import Visa from "../Icons/Visa";
import Mastercard from "../Icons/Mastercard";
import Amex from "../Icons/Amex";
import PayPal from "../Icons/PayPal";
import ApplePay from "../Icons/ApplePay";
import GooglePay from "../Icons/GooglePay";
import ArrowButton from "../Buttons/ArrowButton";
import NewFAQ from "./NewFAQ";
import Testimonials from "../Pages/Home/Testimonials";
import Link from "../Link";
import { useRouter } from "next/router";
import { usePalette } from "../Pages/Deck/DeckPaletteContext";
import { getDeckConfig } from "../../source/deckConfig";

export type FooterLink = {
  label: string;
  href: string;
};

export const links: { [key: string]: FooterLink[] } = {
  "The project": [
    { label: "Home", href: "/" },
    { label: "Our story", href: "/#about" },
    { label: "AR app", href: "/#ar" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Press", href: "/press" },
  ],
  "Shop & help": [
    { label: "Shop", href: "/shop" },
    { label: "Shipping", href: "/shipping" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Stockists", href: "/stockists" },
    { label: "Contact", href: "/contact" },
  ],
  Community: [
    { label: "Participate", href: "/participate" },
    { label: "Contributors", href: "/contributors" },
    { label: "Kickstarter", href: "/kickstarter" },
    { label: "Podcast", href: "/#podcast" },
    { label: "FAQ", href: "/faq" },
  ],
};

const FooterTestimonials = () => {
  const {
    query: { deckId },
  } = useRouter();
  const deckSlug = typeof deckId === "string" ? deckId : undefined;
  const config = getDeckConfig(deckSlug);
  return config.showTestimonials ? <Testimonials id="reviews" deckSlug={deckSlug} /> : null;
};

const ActualFooter = () => {
  const { palette } = usePalette();

  return (
    <Grid
      css={(theme) => [
        {
          background:
            theme.colors[palette === "dark" ? "spaceBlack" : "pale_gray"],
          paddingTop: 60,
          paddingBottom: 120,
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
          },
        ]}
      >
        <div>
          <Text
            typography="newh4"
            css={(theme) => [
              { color: theme.colors[palette === "dark" ? "white50" : "black50"] },
            ]}
          >
            Download Playing Arts AR™ app
          </Text>
          <div css={[{ marginTop: 30 }]}>
            <a
              href="https://apps.apple.com/es/app/playing-arts/id1594901668?l=en"
              target="_blank"
              rel="noopener noreferrer"
              css={{ textDecoration: "none", marginRight: 15 }}
            >
              <ButtonTemplate
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
              a: {
                textDecoration: "underline",
                color:
                  theme.colors[palette === "dark" ? "white" : "black"],
              },
              color: theme.colors[palette === "dark" ? "white" : "black"],
              opacity: 0.25,
              maxWidth: 520,
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
              justifyContent: "space-between",
              alignItems: "start",
            },
          ]}
        >
          <Text
            typography="newh4"
            css={(theme) => [
              {
                color: theme.colors[palette === "dark" ? "white50" : "black50"],
              },
            ]}
          >
            {key}
          </Text>
          <div css={[{ marginTop: 30, display: "grid", gap: 5 }]}>
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
                    },
                  ]}
                >
                  {item.label}
                </ArrowButton>
              </Link>
            ))}
          </div>
        </ScandiBlock>
      ))}
    </Grid>
  );
};

const Footer: FC<HTMLAttributes<HTMLElement> & { onlyFooter?: boolean }> = ({
  children,
  onlyFooter,
  ...props
}) => (
  <>
    {!onlyFooter ? (
      <>
        <FooterTestimonials />
        {children}
        <NewFAQ />
      </>
    ) : null}
    <ActualFooter />
  </>
);

export default Footer;
