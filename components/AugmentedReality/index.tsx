import { FC, HTMLAttributes } from "react";
import { socialLinks } from "../../source/consts";
import Button from "../Button";
import Grid from "../Grid";
import Android from "../Icons/Android";
import Apple from "../Icons/Apple";
import Line from "../Line";
import Link from "../Link";
import StatBlock from "../StatBlock";
import Text from "../Text";
import Hand from "./hand.png";

const AugmentedReality: FC<HTMLAttributes<HTMLElement>> = (props) => (
  <StatBlock
    {...props}
    css={(theme) => ({
      background: `url(${Hand.src}) 100% 100% no-repeat`,
      backgroundColor: theme.colors.page_bg_white,
      color: theme.colors.text_title_dark,
      padding: 0,
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
          Playing Arts is a collective art project for creative people who are
          into Art, Playing Cards, NFTs and sometimes magic.
        </Text>
        <Line spacing={3} />
        <div
          css={(theme) => ({ marginTop: theme.spacing(2), display: "flex" })}
        >
          {socialLinks.playStore && (
            <Button
              Icon={Android}
              component={Link}
              href={socialLinks.playStore}
              target="_blank"
              css={(theme) => ({ marginRight: theme.spacing(2) })}
            >
              Android
            </Button>
          )}
          {socialLinks.appStore && (
            <Button
              Icon={Apple}
              iconProps={{ css: { marginTop: -3 } }}
              component={Link}
              href={socialLinks.appStore}
              target="_blank"
            >
              IOS
            </Button>
          )}
        </div>
      </div>
    </Grid>
  </StatBlock>
);

export default AugmentedReality;
