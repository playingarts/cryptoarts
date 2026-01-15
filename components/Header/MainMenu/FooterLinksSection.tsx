import { FC } from "react";
import ScandiBlock from "../../ScandiBlock";
import Text from "../../Text";
import ArrowButton from "../../Buttons/ArrowButton";
import Link from "../../Link";
import { links } from "../../Footer";
import MenuGrid from "./MenuGrid";

/**
 * Footer navigation links section for MainMenu
 */
const FooterLinksSection: FC = () => {

  return (
    <MenuGrid
      css={[
        {
          paddingTop: 60,
          paddingBottom: 60,
        },
      ]}
    >
      {Object.keys(links).map((key) => (
        <ScandiBlock
          key={key}
          palette="light"
          opacity={0.3}
          css={[
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
            typography="paragraphSmall"
            css={(theme) => [
              {
                color: theme.colors.black50,
              },
            ]}
          >
            {key}
          </Text>
          <div css={[{ marginTop: 30, display: "grid", gap: 5 }]}>
            {links[key].map((item) => (
              <Link key={`${key}-${item.label}`} href={item.href}>
                <ArrowButton
                  css={(theme) => [
                    {
                      textAlign: "start",
                      display: "block",
                      color: theme.colors.black50,
                    },
                  ]}
                  base={true}
                  noColor={true}
                  size="small"
                >
                  {item.label}
                </ArrowButton>
              </Link>
            ))}
          </div>
        </ScandiBlock>
      ))}
      <ScandiBlock
        palette="light"
        opacity={0.3}
        css={(theme) => [
          {
            paddingTop: 15,
            color: theme.colors.black30,
            borderColor: theme.colors.black30,
            display: "flex",
            gap: 30,
            gridColumn: "1/-1",
            marginTop: 60,
          },
        ]}
      >
        <small css={{ maxWidth: "calc(5 * var(--columnWidth) + 4 * 24px)" }}>
          <Text
            typography="paragraphMicro"
            css={(theme) => [
              {
                color: theme.colors.black50,
                a: {
                  textDecoration: "underline",
                  color: theme.colors.black50,
                },
              },
            ]}
          >
            © 2012—2026 Digital Abstracts SL. Any artwork displayed on this
            website may not be reproduced or used in any manner whatsoever without
            the express written permission of Digital Abstracts or their
            respective owners. Patent Pending. Thanks for reading this, bye!
            <br />
            <br />
            <a
              css={[{ textDecoration: "underline", marginRight: 15 }]}
              href="/privacy"
            >
              Privacy Statement
            </a>
            <a css={[{ textDecoration: "underline" }]} href="/terms">
              Terms of Service
            </a>
          </Text>
        </small>
      </ScandiBlock>
    </MenuGrid>
  );
};

export default FooterLinksSection;
