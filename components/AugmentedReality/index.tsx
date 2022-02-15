import { FC, HTMLAttributes } from "react";
import Button from "../Button";
import Grid from "../Grid";
import Android from "../Icons/Android";
import Apple from "../Icons/Apple";
import Line from "../Line";
import StatBlock from "../StatBlock";
import Text from "../Text";
import Hand from "./hand.png";

const AugmentedReality: FC<HTMLAttributes<HTMLElement>> = (props) => (
  <StatBlock
    {...props}
    padding={0}
    css={(theme) => ({
      background: `url(${Hand.src}) bottom right no-repeat`,
      backgroundColor: theme.colors.dark_gray,
      color: theme.colors.text_title_light,
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10),
    })}
  >
    <Grid>
      <div css={{ gridColumn: "2 / span 5" }}>
        <Text component="h3" css={{ margin: 0 }}>
          Augmented Reality
        </Text>
        <Text variant="body2">
          Hover the card to see animation. Click to read the story behind the
          artwork. Playing Arts is a collective art project for creative people
          who are into Art, Playing Cards, NFTs and sometimes magic.
        </Text>
        <Line spacing={3} />
        <Text
          variant="h6"
          css={{
            opacity: 0.5,
            margin: 0,
          }}
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
    </Grid>
  </StatBlock>
);

export default AugmentedReality;
