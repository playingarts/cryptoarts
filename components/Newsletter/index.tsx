import { FC, HTMLAttributes } from "react";
import dynamic from "next/dynamic";
import Grid from "../Grid";
import ScandiBlock from "../ScandiBlock";
import Text from "../Text";
import IconArrow from "../Icons/IconArrow";

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
      paddingTop: 60,
      paddingBottom: 60,
    })}
    {...props}
  >
    <Grid>
      {/* Left column - Title */}
      <ScandiBlock
        palette="dark"
        css={{
          gridColumn: "span 6",
          paddingTop: 15,
          alignItems: "start",
        }}
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
      </ScandiBlock>

      {/* Right column - Description + Form */}
      <ScandiBlock
        palette="dark"
        css={{
          gridColumn: "span 6",
          paddingTop: 15,
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Text
          typography="paragraphBig"
          css={(theme) => ({
            color: theme.colors.white,
          })}
        >
          Explore project updates
        </Text>
        <div css={{ width: "100%", marginTop: 30 }}>
          <EmailForm palette="dark" />
        </div>
      </ScandiBlock>

      {/* Disclaimer text - 4 columns, aligned with right column */}
      <Text
        typography="paragraphNano"
        css={(theme) => ({
          gridColumn: "7 / span 4",
          color: theme.colors.white,
          marginTop: 30,
        })}
      >
        Join 10,000+ collectors for early access to exclusive drops and
        automatic entry into our monthly giveaways.
      </Text>
    </Grid>
  </section>
);

export default Newsletter;
