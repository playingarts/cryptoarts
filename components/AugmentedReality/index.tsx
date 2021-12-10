import { FC, HTMLAttributes } from "react";
import Box from "../Box";
import Button from "../Button";
import Android from "../Icons/Android";
import Apple from "../Icons/Apple";
import Line from "../Line";
import Text from "../Text";
import Hand from "./hand.png";

const AugmentedReality: FC<HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <Box
      {...props}
      css={(theme) => ({
        background: `${theme.colors.dark_gray} url(${Hand}) bottom right no-repeat`,
        color: theme.colors.text_title_light,
      })}
    >
      <div css={{ width: "50%" }}>
        <Text component="h3">Augmented Reality</Text>
        <Text variant="body2">
          Hover the card to see animation. Click to read the story behind the
          artwork. Playing Arts is a collective art project for creative people
          who are into Art, Playing Cards, NFTs and sometimes magic.
        </Text>
        <Line spacing={3} />
        <Text
          component="h6"
          css={(theme) => ({
            color: theme.colors.text_subtitle_light,
            margin: 0,
          })}
        >
          Download the app
        </Text>
        <div
          css={(theme) => ({ marginTop: theme.spacing(2), display: "flex" })}
        >
          <Button
            Icon={Android}
            css={(theme) => ({ marginRight: theme.spacing(2) })}
          >
            Android
          </Button>
          <Button Icon={Apple} iconProps={{ css: { marginTop: -3 } }}>
            IOS
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default AugmentedReality;
