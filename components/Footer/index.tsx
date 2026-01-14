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
          paddingBottom: 60,
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
          },
        ]}
      >
        <ArrowedButton
          css={(theme) => [
            { color: theme.colors[palette === "dark" ? "white50" : "black50"] },
          ]}
        >
          Be the first to explore project updates
        </ArrowedButton>
        <Grid auto={true}>
          <div css={[{ marginTop: 60, gridColumn: "span 5" }]}>
            <EmailForm />
            <Text
              typography="paragraphNano"
              css={(theme) => [
                {
                  color:
                    theme.colors[palette === "dark" ? "white50" : "black50"],
                  marginTop: 30,
                },
              ]}
            >
              Join our newsletter to stay updated on exclusive deals and gain
              automatic entry into our monthly giveaways.
            </Text>
            <div
              css={(theme) => [
                {
                  marginTop: 30,
                  display: "flex",
                  gap: 30,
                  color:
                    theme.colors[palette === "dark" ? "white50" : "black30"],
                },
              ]}
            >
              <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram />
              </Link>
              <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter />
              </Link>
              <Link href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                <Youtube />
              </Link>
            </div>
          </div>
        </Grid>
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
          <div css={[{ marginTop: 60, display: "grid", gap: 10 }]}>
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
                      // display: "block",
                      textAlign: "start",
                      color:
                        theme.colors[
                          palette === "dark" ? "white50" : "black50"
                        ],
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
      <div css={[{ gridColumn: "span 6", marginTop: 60 }]}>
        <Text
          typography="paragraphSmall"
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
              css={{
                paddingLeft: 10,
              }}
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
              css={{
                paddingLeft: 10,
              }}
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
      <div
        css={[
          {
            gridColumn: "span 6",
            marginTop: 60,
            display: "grid",
            alignItems: "end",
          },
        ]}
      >
        <div>
          <Link href="/shop">
            <ArrowButton color="accent" css={[{ marginTop: 30 }]}>
              Start your collection
            </ArrowButton>
          </Link>
        </div>
      </div>
      <div css={[{ gridColumn: "span 6", marginTop: 30 }]}>
        <ScandiBlock
          opacity={0.3}
          css={(theme) => [
            {
              paddingTop: 30,
              color: theme.colors[palette === "dark" ? "white50" : "black30"],
              display: "flex",
              gap: 20,
            },
          ]}
        >
          <Visa css={{ transform: "scale(0.72)" }} />
          <Mastercard css={{ transform: "scale(0.72)" }} />
          <Amex css={{ transform: "scale(0.72)" }} />
          <PayPal css={{ transform: "scale(0.81)" }} />
          <ApplePay css={{ transform: "scale(0.9)" }} />
          <GooglePay css={{ transform: "scale(0.9)" }} />
        </ScandiBlock>
      </div>
      <div css={[{ gridColumn: "span 6", marginTop: 30 }]}>
        <ScandiBlock
          opacity={0.3}
          css={(theme) => [
            {
              paddingTop: 30,
              color: theme.colors.black30,
              display: "flex",
              gap: 30,
            },
          ]}
        >
          <Text
            typography="paragraphMicro"
            css={(theme) => [
              {
                a: {
                  textDecoration: "underline",
                  color:
                    theme.colors[palette === "dark" ? "white50" : "black50"],
                },
                color: theme.colors[palette === "dark" ? "white50" : "black50"],
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
      </div>
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
