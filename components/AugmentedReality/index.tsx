import { FC, HTMLAttributes } from "react";
import Grid from "../Grid";
import Line from "../Line";
import StatBlock from "../StatBlock";
import StoreButtons from "../StoreButtons";
import Text from "../Text";

const AugmentedReality: FC<HTMLAttributes<HTMLElement>> = (props) => (
  <StatBlock
    {...props}
    css={(theme) => ({
      background:
        "url(https://s3.amazonaws.com/img.playingarts.com/www/static/ar_app.jpg) bottom right no-repeat",
      backgroundSize: "50%",
      backgroundColor: theme.colors.white,
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
        <StoreButtons ButtonProps={{ color: "black" }} />
      </div>
    </Grid>
  </StatBlock>
);

export default AugmentedReality;
