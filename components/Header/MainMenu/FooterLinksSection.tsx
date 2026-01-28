import { FC } from "react";
import ScandiBlock from "../../ScandiBlock";
import Text from "../../Text";
import Link from "../../Link";
import { links } from "../../Footer";
import MenuGrid from "./MenuGrid";

interface FooterLinksSectionProps {
  onClose?: () => void;
}

/**
 * Footer navigation links section for MainMenu
 * Matches global footer styling on mobile
 */
const FooterLinksSection: FC<FooterLinksSectionProps> = ({ onClose }) => {

  return (
    <MenuGrid
      css={(theme) => [
        {
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
          [theme.maxMQ.xsm]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
            gridTemplateColumns: "repeat(6, 1fr)",
          },
        },
      ]}
    >
      {Object.keys(links).map((key) => (
        <ScandiBlock
          key={key}
          palette="light"
          opacity={0.3}
          css={(theme) => [
            {
              gridColumn: "span 2",
              paddingTop: 15,
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "start",
              [theme.maxMQ.xsm]: {
                gridColumn: "span 2",
              },
            },
          ]}
        >
          <Text
            typography="p-s"
            css={(theme) => [
              {
                color: theme.colors.black50,
                [theme.maxMQ.xsm]: theme.typography["p-s"],
              },
            ]}
          >
            {key}
          </Text>
          <div css={(theme) => [{ marginTop: theme.spacing(3), display: "grid", gap: 5, [theme.maxMQ.xsm]: { gap: 0 } }]}>
            {links[key].map((item) => (
              <Link
                key={`${key}-${item.label}`}
                href={item.href}
                onClick={onClose}
                css={[{ display: "block" }]}
              >
                <Text
                  typography="p-s"
                  css={(theme) => [
                    {
                      textAlign: "start",
                      paddingTop: 5,
                      paddingBottom: 5,
                      color: theme.colors.black50,
                      transition: theme.transitions.fast("color"),
                      "&:hover": {
                        color: theme.colors.black,
                      },
                      [theme.maxMQ.xsm]: {
                        fontSize: 16,
                      },
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </Link>
            ))}
          </div>
        </ScandiBlock>
      ))}

      {/* Copyright section */}
      <Text
        typography="p-xxs"
        css={(theme) => [
          {
            gridColumn: "1/-1",
            marginTop: theme.spacing(6),
            a: {
              textDecoration: "underline",
              color: theme.colors.black,
            },
            color: theme.colors.black,
            opacity: 0.5,
            maxWidth: 520,
            [theme.maxMQ.xsm]: {
              marginTop: theme.spacing(3),
              fontSize: 10,
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
        <Link
          css={[{ textDecoration: "underline", marginRight: 15 }]}
          href="/privacy"
          onClick={onClose}
        >
          Privacy Statement
        </Link>
        <Link css={[{ textDecoration: "underline" }]} href="/terms" onClick={onClose}>
          Terms of Service
        </Link>
      </Text>
    </MenuGrid>
  );
};

export default FooterLinksSection;
