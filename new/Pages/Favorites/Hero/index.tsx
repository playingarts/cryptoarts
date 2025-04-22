import { FC, HTMLAttributes } from "react";
import Text from "../../../Text";
import favImg from "../../../../mocks/images/Favorites/PlayingArts_3Clubs_Final 1.png";
import Grid from "../../../../components/Grid";
import { useFavorites } from "../../../Contexts/favorites";

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { favorites } = useFavorites();

  return (
    <Grid css={[{ paddingTop: 235, paddingBottom: 60, overflow: "hidden" }]}>
      <Text typography="newh3" css={[{ gridColumn: "span 6" }]}>
        Your personal gallery of{" "}
        {!favorites ? 0 : Object.values(favorites).flat().length} inspiring
        cards from {!favorites ? 0 : Object.keys(favorites).length}{" "}
        {favorites && Object.keys(favorites).length === 1
          ? "unique deck"
          : "unique decks"}
        .
      </Text>
      <div css={[{ gridColumn: "span 1/-1", position: "relative" }]}>
        <img
          src={favImg.src}
          alt=""
          css={[{ position: "absolute", top: -175, right: 0 }]}
        />
      </div>
    </Grid>
  );
};

export default Hero;
