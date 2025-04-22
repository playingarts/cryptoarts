import { FC, HTMLAttributes } from "react";
import Grid from "../../components/Grid";
import ScandiBlock from "../ScandiBlock";
import ArrowedButton from "../Buttons/ArrowedButton";
import Text from "../Text";
import NewLink from "../Link/NewLink";
import EmailForm from "../EmailForm";
import Instagram from "../Icons/Instagram";
import Twitter from "../Icons/Twitter";
import Youtube from "../Icons/Youtube";
import ButtonTemplate from "../Buttons/Button";
import Apple from "../Icons/Apple";
import Android from "../Icons/Android";
import Visa from "../../components/Icons/Visa";
import Mastercard from "../../components/Icons/Mastercard";
import Amex from "../../components/Icons/Amex";
import PayPal from "../../components/Icons/PayPal";
import ApplePay from "../Icons/ApplePay";
import GooglePay from "../Icons/GooglePay";
import ArrowButton from "../Buttons/ArrowButton";
import NewFAQ from "./NewFAQ";
import Testimonials from "../Pages/Home/Testimonials";
import Link from "../Link";
import { useRouter } from "next/router";
import { usePalette } from "../Pages/Deck/DeckPaletteContext";

export const links: { [x: string]: String[] } = {
  "The project": ["Home", "Our story", "AR app", "Gallery", "Press"],
  "Shop & help": ["Shop", "Shipping", "Reviews", "Stockists", "Contact"],
  Community: ["Participate", "Contributors", "Kickstarter", "Podcast", "FAQ"],
};

const FooterTestimonials = () => {
  const {
    query: { deckId },
  } = useRouter();
  return deckId !== "crypto" ? <Testimonials id="reviews" /> : null;
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
                  color:
                    theme.colors[palette === "dark" ? "white50" : "black30"],
                  "svg:not(:first-of-type)": {
                    marginLeft: 30,
                  },
                },
              ]}
            >
              <Instagram />
              <Twitter />
              <Youtube />
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
                key={item + "Link"}
                href={item.split(" ").join("").toLowerCase()}
                css={[{ display: "block" }]}
              >
                <ArrowButton
                  noColor={true}
                  base={true}
                  size="small"
                  css={(theme) => [
                    {
                      display: "block",
                      textAlign: "start",
                      color:
                        theme.colors[
                          palette === "dark" ? "white50" : "black50"
                        ],
                    },
                  ]}
                >
                  {item}
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
          <ButtonTemplate
            css={(theme) => [
              {
                paddingLeft: 10,
                marginRight: 15,
              },
            ]}
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

          <ButtonTemplate
            color={palette === "dark" ? "white50" : undefined}
            css={(theme) => [
              {
                paddingLeft: 10,
              },
            ]}
            palette={palette}
          >
            <Android
              css={{
                marginRight: 10,
              }}
            />
            Android
          </ButtonTemplate>
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
          <ArrowButton color="accent" css={[{ marginTop: 30 }]}>
            Start your collection
          </ArrowButton>
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
              gap: 30,
            },
          ]}
        >
          <Visa />
          <Mastercard />
          <Amex />
          <PayPal />
          <ApplePay />
          <GooglePay />
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
            © 2012—2025 Digital Abstracts SL. Any artwork displayed on this
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
