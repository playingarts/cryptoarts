import { FC } from "react";
import dynamic from "next/dynamic";
import ScandiBlock from "../../ScandiBlock";
import Text from "../../Text";
import MenuGrid from "./MenuGrid";

// Lazy load EmailForm to reduce bundle (includes react-hook-form ~23kB)
const EmailForm = dynamic(() => import("../../EmailForm"), {
  ssr: false,
  loading: () => <div css={{ height: 55 }} />,
});

/**
 * Newsletter subscription section for MainMenu
 */
const NewsletterSection: FC = () => {
  return (
    <MenuGrid
      css={(theme) => [
        {
          background: theme.colors.accent,
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
        },
      ]}
    >
      <ScandiBlock
        palette="dark"
        css={(theme) => [
          {
            paddingTop: 15,
            gridColumn: "1/-1",
            flexDirection: "column",
            alignItems: "start",
            color: theme.colors.white + "!important",
            form: {
              width: "100%",
              marginTop: theme.spacing(3),
            },
          },
        ]}
      >
        <Text
          typography="paragraphSmall"
          palette="dark"
          css={(theme) => ({ color: theme.colors.white, fontSize: 25 })}
        >
          Project updates
        </Text>
        <EmailForm />
      </ScandiBlock>
      <Text
        typography="paragraphNano"
        css={(theme) => ({
          gridColumn: "span 4",
          marginTop: theme.spacing(3),
          color: theme.colors.white,
        })}
        palette="dark"
      >
        Join 10,000+ collectors for early access to exclusive drops, and gain
        automatic entry into our monthly giveaways.
      </Text>
    </MenuGrid>
  );
};

export default NewsletterSection;
