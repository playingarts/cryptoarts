import Grid from "../../components/Grid";
import { mockCard } from "../../mocks/card";
import { theme } from "../../pages/_app";
import ExploreButton from "../Buttons/ExploreButton";
import ShopArrowButton from "../Buttons/ShopArrowButton";
import Fastcompany from "../Icons/Fastcompany";
import Text from "../Text";
import HeroCard from "./HeroCard";

type Props = {};

const Hero = (props: Props) => {
  const card = { ...mockCard, cardColor: theme.colors.favourite };
  return (
    <Grid
      css={{
        height: 750,
        background: card.cardColor,
        alignContent: "end",
        paddingBottom: 76,
      }}
    >
      <div
        css={[{ gridColumn: "1/ span 6", display: "grid", alignItems: "end" }]}
      >
        <Text>Collective Art Project</Text>
        <Text typography="newh2" css={{ marginTop: 30, marginBottom: 60 }}>
          <span>
            “Beautifully crafted decks of cards that showcase global artists.”
            <Text css={{ display: "inline", margin: "0 9px" }}>—</Text>
            <Fastcompany />
          </span>
        </Text>
        <div css={{ display: "flex", gap: 15 }}>
          <ExploreButton>Discover</ExploreButton>
          <ShopArrowButton variant="border" />
        </div>
      </div>
      <div css={[{ gridColumn: "7/-1" }]}>
        <HeroCard />
      </div>
    </Grid>
  );
};

export default Hero;
