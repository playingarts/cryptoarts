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
import ButtonTemplate from "../Buttons/Templates/ButtonTemplate";
import Apple from "../Icons/Apple";
import Android from "../Icons/Android";
import Visa from "../../components/Icons/Visa";
import Mastercard from "../../components/Icons/Mastercard";
import Amex from "../../components/Icons/Amex";
import PayPal from "../../components/Icons/PayPal";
import ApplePay from "../Icons/ApplePay";
import GooglePay from "../Icons/GooglePay";
import ArrowButton from "../Buttons/Templates/ArrowButton";

export const links: { [x: string]: String[] } = {
  "The project": ["Home", "Our story", "AR app", "Gallery", "Press"],
  "Shop & help": ["Shop", "Shipping", "Reviews", "Stockists", "Contact"],
  Community: ["Participate", "Contributors", "Kickstarter", "Podcast", "FAQ"],
};

const Footer: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <Grid
    css={(theme) => [
      { background: theme.colors.pale_gray, paddingTop: 60, paddingBottom: 60 },
    ]}
  >
    <ScandiBlock
      css={(theme) => [
        {
          borderColor: theme.colors.black30,
          gridColumn: "span 6",
          paddingTop: 15,
          alignItems: "start",
          flexDirection: "column",
        },
      ]}
    >
      <ArrowedButton css={(theme) => [{ color: theme.colors.black50 }]}>
        Be the first to explore project updates
      </ArrowedButton>
      <Grid auto={true}>
        <div css={[{ marginTop: 60, gridColumn: "span 5" }]}>
          <EmailForm />
          <Text
            typography="paragraphNano"
            css={(theme) => [{ color: theme.colors.black50, marginTop: 30 }]}
          >
            Join our newsletter to stay updated on exclusive deals and gain
            automatic entry into our monthly giveaways.
          </Text>
          <div
            css={(theme) => [
              {
                marginTop: 30,
                color: theme.colors.black30,
                "svg:not(:first-child)": {
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
        css={(theme) => [
          {
            borderColor: theme.colors.black30,
            gridColumn: "span 2",
            paddingTop: 15,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
            "> *": {
              color: theme.colors.black50,
            },
          },
        ]}
      >
        <Text>{key}</Text>
        <div css={[{ marginTop: 60 }]}>
          {links[key].map((item) => (
            <NewLink
              href={item.split(" ").join("").toLowerCase()}
              css={[{ display: "block" }]}
            >
              {item}
            </NewLink>
          ))}
        </div>
      </ScandiBlock>
    ))}
    <div css={[{ gridColumn: "span 6", marginTop: 60 }]}>
      <Text
        typography="paragraphSmall"
        css={(theme) => [{ color: theme.colors.black30 }]}
      >
        Download Playing Arts AR™ app
      </Text>
      <div css={[{ marginTop: 30 }]}>
        <ButtonTemplate
          css={(theme) => [
            {
              color: "white",
              background: theme.colors.dark_gray,
              paddingRight: 15,
              marginRight: 15,
              "&:hover": {
                background: theme.colors.dark_gray_hover,
              },
            },
          ]}
        >
          <Apple /> iPhone
        </ButtonTemplate>

        <ButtonTemplate
          css={(theme) => [
            {
              color: "white",
              background: theme.colors.dark_gray,
              paddingRight: 15,
              "&:hover": {
                background: theme.colors.dark_gray_hover,
              },
            },
          ]}
        >
          <Android /> Android
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
        <ArrowButton variant="accent" css={[{ marginTop: 30 }]}>
          Start your collection
        </ArrowButton>
      </div>
    </div>
    <div css={[{ gridColumn: "span 6", marginTop: 30 }]}>
      <ScandiBlock
        css={(theme) => [
          {
            paddingTop: 30,
            color: theme.colors.black30,
            borderColor: theme.colors.black30,
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
        css={(theme) => [
          {
            paddingTop: 30,
            color: theme.colors.black30,
            borderColor: theme.colors.black30,
            display: "flex",
            gap: 30,
          },
        ]}
      >
        <Text
          typography="paragraphMicro"
          css={(theme) => [
            {
              a: { textDecoration: "underline", color: theme.colors.black50 },
              color: theme.colors.black50,
            },
          ]}
        >
          © 2012—2025 Digital Abstracts SL. Any artwork displayed on this
          website may not be reproduced or used in any manner whatsoever without
          the express written permission of Digital Abstracts or their
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

export default Footer;
