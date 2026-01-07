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
          background: theme.colors.violet,
          paddingTop: 60,
          paddingBottom: 60,
        },
      ]}
    >
      <ScandiBlock
        palette="light"
        css={(theme) => [
          {
            paddingTop: 15,
            gridColumn: "1/-1",
            flexDirection: "column",
            alignItems: "start",
            color: theme.colors.dark_gray + "!important",
            form: {
              width: "100%",
              marginTop: 30,
            },
          },
        ]}
      >
        <Text typography="paragraphSmall" palette="light">
          Explore project updates
        </Text>
        <EmailForm />
      </ScandiBlock>
      <Text
        typography="paragraphNano"
        css={[{ gridColumn: "span 4", marginTop: 30 }]}
        palette="light"
      >
        Join 10,000+ collectors for early access to exclusive drops, and gain
        automatic entry into our monthly giveaways.
      </Text>
    </MenuGrid>
  );
};

export default NewsletterSection;
