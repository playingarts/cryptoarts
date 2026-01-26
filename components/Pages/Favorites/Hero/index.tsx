import { FC, HTMLAttributes, useMemo } from "react";
import Text from "../../../Text";
import Grid from "../../../Grid";
import ArrowButton from "../../../Buttons/ArrowButton";
import { useFavorites } from "../../../Contexts/favorites";
import { useCardsByIds } from "../../../../hooks/card";
import { HEADER_OFFSET } from "../../../../styles/theme";

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { favorites } = useFavorites();

  // Get all favorite card IDs
  const allFavoriteIds = useMemo(() => {
    if (!favorites) return [];
    return Object.values(favorites).flat().filter((id) => id && id.length > 0);
  }, [favorites]);

  // Fetch cards to check editions for Future deck
  const { cards: allCards } = useCardsByIds({
    variables: { ids: allFavoriteIds },
    skip: allFavoriteIds.length === 0,
  });

  // Count cards and decks, splitting Future by edition
  const { cardCount, deckCount } = useMemo(() => {
    if (!favorites) return { cardCount: 0, deckCount: 0 };

    let cardCount = 0;
    let deckCount = 0;

    for (const [deckSlug, ids] of Object.entries(favorites)) {
      const validIds = ids.filter((id) => id && id.trim() !== "");
      if (validIds.length === 0) continue;

      cardCount += validIds.length;

      // Split Future into Chapter I and Chapter II
      if (deckSlug === "future" && allCards) {
        const futureCards = allCards.filter((c) => validIds.includes(c._id));
        const hasChapterI = futureCards.some((c) => c.edition === "chapter i");
        const hasChapterII = futureCards.some((c) => c.edition === "chapter ii");
        deckCount += (hasChapterI ? 1 : 0) + (hasChapterII ? 1 : 0);
      } else {
        deckCount += 1;
      }
    }

    return { cardCount, deckCount };
  }, [favorites, allCards]);

  return (
    <Grid css={(theme) => [{ paddingTop: HEADER_OFFSET.desktop, background: theme.colors.pale_gray, [theme.maxMQ.sm]: { paddingTop: HEADER_OFFSET.tablet }, [theme.maxMQ.xsm]: { paddingTop: HEADER_OFFSET.mobile } }]}>
      <div css={(theme) => [{ gridColumn: "span 6", [theme.maxMQ.sm]: { gridColumn: "1 / -1" } }]}>
        <Text typography="newh3">
          {cardCount === 0
            ? "No favorites yet. Add cards to your favorites from any deck page."
            : `Your personal gallery of ${cardCount} inspiring cards from ${deckCount} ${deckCount === 1 ? "unique deck" : "unique decks"}.`}
        </Text>
        {cardCount === 0 && (
          <ArrowButton color="accent" size="medium" css={(theme) => ({ marginTop: theme.spacing(3) })} href="/#collection">
            Browse collection
          </ArrowButton>
        )}
      </div>
    </Grid>
  );
};

export default Hero;
