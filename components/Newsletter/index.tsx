import { FC, HTMLAttributes } from "react";
import dynamic from "next/dynamic";
import Grid from "../Grid";
import ScandiBlock from "../ScandiBlock";
import Text from "../Text";
import Link from "../Link";
import IconArrow from "../Icons/IconArrow";
import Instagram from "../Icons/Instagram";
import Twitter from "../Icons/Twitter";
import Youtube from "../Icons/Youtube";
import { socialLinks } from "../../source/consts";

// Lazy load EmailForm to reduce bundle (includes react-hook-form ~23kB)
const EmailForm = dynamic(() => import("../EmailForm"), {
  ssr: false,
  loading: () => <div css={{ height: 55 }} />,
});

/**
 * Newsletter subscription section with two-column layout
 * Title on left, description + email form on right
 * Violet (accent) background
 */
const Newsletter: FC<HTMLAttributes<HTMLElement>> = (props) => (
  <section
    css={(theme) => ({
      background: theme.colors.accent,
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      [theme.maxMQ.xsm]: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
      },
    })}
    {...props}
  >
    <Grid>
      {/* Left column - Title + Social Icons */}
      <ScandiBlock
        palette="dark"
        css={(theme) => ({
          gridColumn: "span 6",
          paddingTop: 15,
          alignItems: "start",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          borderTop: "1px solid white",
          [theme.maxMQ.xsm]: {
            gridColumn: "1 / -1",
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(2),
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
          Newsletter
        </Text>
        <div
          css={(theme) => ({
            display: "flex",
            gap: theme.spacing(3),
            marginTop: "auto",
            "& svg": {
              width: 24,
              height: 24,
              color: theme.colors.white,
              transition: "opacity 0.2s",
              "&:hover": {
                opacity: 0.7,
              },
            },
            [theme.maxMQ.xsm]: {
              display: "none",
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
      </ScandiBlock>

      {/* Right column - Description + Form */}
      <ScandiBlock
        palette="dark"
        css={(theme) => ({
          gridColumn: "span 6",
          paddingTop: 15,
          flexDirection: "column",
          alignItems: "start",
          borderTop: "1px solid white",
          [theme.maxMQ.xsm]: {
            gridColumn: "1 / -1",
            borderTop: "none",
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
          },
        })}
      >
        <Text
          typography="paragraphBig"
          css={(theme) => ({
            color: theme.colors.white,
          })}
        >
          Project updates
        </Text>
        <div css={(theme) => ({ width: "100%", marginTop: theme.spacing(6), [theme.maxMQ.xsm]: { marginTop: theme.spacing(3) } })}>
          <EmailForm palette="dark" />
          <Text
            typography="paragraphNano"
            css={(theme) => ({
              color: theme.colors.white,
              marginTop: theme.spacing(3),
              width: "66.67%", // 4 columns out of 6
              [theme.maxMQ.xsm]: {
                width: "100%",
              },
            })}
          >
            Join 10,000+ collectors for early access to exclusive drops and
            automatic entry into our monthly giveaways.
          </Text>
          {/* Mobile-only social icons */}
          <div
            css={(theme) => ({
              display: "none",
              [theme.maxMQ.xsm]: {
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
    </Grid>
  </section>
);

export default Newsletter;
