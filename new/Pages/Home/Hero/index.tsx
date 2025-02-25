import Grid from "../../../../components/Grid";
import { mockCard } from "../../../../mocks/card";
import ArrowButton from "../../../Buttons/ArrowButton";
import ExploreButton from "../../../Buttons/ExploreButton";
import Text from "../../../Text";
import HeroCard from "./HeroCard";

type Props = {};

const Hero = (props: Props) => {
  const card = { ...mockCard, cardColor: "#D4E5DA" };
  return (
    <Grid
      css={{
        height: 709,
        background: card.cardColor,
        alignContent: "end",
        paddingBottom: 60,
      }}
    >
      <div
        css={[
          { gridColumn: "1/ span 6", display: "grid", alignContent: "end" },
        ]}
      >
        <Text typography="newh4">Collective Art Project —</Text>
        <Text typography="newh2" css={{ marginTop: 30 }}>
          <span>“Where art and play come together in every playing card.”</span>
        </Text>
        <div css={{ display: "flex", gap: 15, marginTop: 30 }}>
          <ExploreButton color="accent">Discover</ExploreButton>
          <ArrowButton bordered={true} color="accent">
            Shop
          </ArrowButton>
        </div>
      </div>
      <div css={[{ gridColumn: "7/-1", paddingLeft: 80, paddingBottom: 6 }]}>
        <HeroCard />
      </div>
    </Grid>
  );
};

export default Hero;
