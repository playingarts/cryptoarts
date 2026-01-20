import { FC, HTMLAttributes } from "react";
import Text from "../../../Text";
import Grid from "../../../Grid";
import { useFavorites } from "../../../Contexts/favorites";

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { favorites } = useFavorites();

  return (
    <Grid css={(theme) => [{ paddingTop: 235, background: theme.colors.pale_gray }]}>
      <Text typography="newh3" css={[{ gridColumn: "span 6" }]}>
        Your personal gallery of{" "}
        {!favorites ? 0 : Object.values(favorites).flat().length} inspiring
        cards from {!favorites ? 0 : Object.keys(favorites).length}{" "}
        {favorites && Object.keys(favorites).length === 1
          ? "unique deck"
          : "unique decks"}
        .
      </Text>
    </Grid>
  );
};

export default Hero;
