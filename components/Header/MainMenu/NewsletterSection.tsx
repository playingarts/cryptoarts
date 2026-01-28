import { FC } from "react";
import dynamic from "next/dynamic";
import ScandiBlock from "../../ScandiBlock";
import Text from "../../Text";
import Link from "../../Link";
import IconArrow from "../../Icons/IconArrow";
import Instagram from "../../Icons/Instagram";
import Twitter from "../../Icons/Twitter";
import Youtube from "../../Icons/Youtube";
import { socialLinks } from "../../../source/consts";
import MenuGrid from "./MenuGrid";

// Lazy load EmailForm to reduce bundle (includes react-hook-form ~23kB)
const EmailForm = dynamic(() => import("../../EmailForm"), {
  ssr: false,
  loading: () => <div css={{ height: 55 }} />,
});

/**
 * Newsletter subscription section for MainMenu
 * Matches global footer Newsletter layout on mobile
 */
const NewsletterSection: FC = () => {
  return (
    <MenuGrid
      css={(theme) => [
        {
          background: theme.colors.accent,
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
          [theme.maxMQ.xsm]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
          },
        },
      ]}
    >
      {/* Newsletter content */}
      <ScandiBlock
        palette="dark"
        css={(theme) => ({
          gridColumn: "1 / -1",
          paddingTop: 15,
          flexDirection: "column",
          alignItems: "start",
          borderTop: "1px solid white",
          [theme.maxMQ.xsm]: {
            borderTop: "none",
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
          },
        })}
      >
        <Text
          css={(theme) => ({
            display: "flex",
            alignItems: "center",
            color: theme.colors.white,
          })}
        >
          <IconArrow css={{ marginRight: 10 }} />
          Newsletter — Project updates
        </Text>
        <div css={(theme) => ({ width: "100%", marginTop: theme.spacing(6), [theme.maxMQ.xsm]: { marginTop: theme.spacing(3) } })}>
          <EmailForm palette="dark" />
          <Text
            typography="p-xs"
            css={(theme) => ({
              color: theme.colors.white,
              marginTop: theme.spacing(3),
              width: "66.67%",
              [theme.maxMQ.xsm]: {
                width: "100%",
              },
            })}
          >
            Join 10,000+ collectors for early access to exclusive drops and
            automatic entry into our monthly giveaways.
          </Text>
          {/* Social icons */}
          <div
            css={(theme) => ({
              display: "flex",
              gap: theme.spacing(3),
              marginTop: theme.spacing(3),
              "& svg": {
                width: 24,
                height: 24,
                color: theme.colors.white,
                transition: "opacity 0.2s",
                "&:hover": {
                  opacity: 0.7,
                },
              },
            })}
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
      </ScandiBlock>
    </MenuGrid>
  );
};

export default NewsletterSection;
