import { FC } from "react";
import Box, { Props as BoxProps } from "../Box";
import Button from "../Button";
import Eth from "../Icons/Eth";
import Text from "../Text";
import background from "./background.png";

const LatestRelease: FC<BoxProps> = (props) => (
  <Box
    {...props}
    narrow={true}
    css={(theme) => ({
      background: `url(${background.src}) 100% 100% no-repeat`,
      backgroundColor: "#000",
      color: theme.colors.text_title_light,
      position: "relative",
    })}
  >
    <div css={{ width: "55%" }}>
      <Text variant="h6" css={{ marginTop: 0, opacity: 0.5 }}>
        LATEST RELEASE
      </Text>
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
  </Box>
);

export default LatestRelease;
