import { FC } from "react";
import Button from "../Button";
import Eth from "../Icons/Eth";
import StatBlock, { Props as StatBlockProps } from "../StatBlock";
import Text from "../Text";
import background from "./background.png";

const LatestRelease: FC<Omit<StatBlockProps, "title" | "action">> = (props) => (
  <StatBlock
    {...props}
    css={(theme) => ({
      background: `url(${background.src}) 100% 100% no-repeat`,
      backgroundColor: "#000",
      color: theme.colors.text_title_light,
      position: "relative",
    })}
    title="LATEST RELEASE"
  >
    <div css={{ width: "55%" }}>
      <Text component="h2" css={{ margin: 0 }}>
        Crypto Edition
      </Text>
      <Text variant="body2" css={{ opacity: 0.5 }}>
        Playing Arts Crypto Edition (PACE) is a deck of playing cards featuring
        works of 55 leading digital artists living on the Ethereum blockchain.
      </Text>
      <Button>Explore</Button>
    </div>
    <Eth
      css={(theme) => ({
        opacity: 0.05,
        height: theme.spacing(40),
        width: theme.spacing(24),
        right: theme.spacing(2.5),
        top: -theme.spacing(12),
        position: "absolute",
      })}
    />
  </StatBlock>
);

export default LatestRelease;
