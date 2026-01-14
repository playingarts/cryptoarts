import { FC, HTMLAttributes, useMemo } from "react";
import { useRouter } from "next/router";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import background from "../../../../mocks/images/backgroundImage.png";
import background1 from "../../../../mocks/images/DeckGallery/gallery-thumbnail-3.png";
import background2 from "../../../../mocks/images/DeckGallery/gallery-thumbnail-2.png";
import background3 from "../../../../mocks/images/DeckGallery/gallery-thumbnail-1.png";
import background4 from "../../../../mocks/images/DeckGallery/gallery-thumbnail.png";
import Text from "../../../Text";
import { useFutureChapter } from "../FutureChapterContext";
import { useDecks } from "../../../../hooks/deck";
import { useCardsForDeck } from "../../../../hooks/card";

const Gallery: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { query } = useRouter();
  const deckId = query.deckId;
  const { activeTab, activeEdition, isFutureDeck } = useFutureChapter();

  // Get deck ID for Future chapters
  const { decks } = useDecks();
  const targetDeckSlug = isFutureDeck
    ? activeTab === "future-ii"
      ? "future-ii"
      : "future"
    : typeof deckId === "string"
    ? deckId
    : undefined;
  const deck = useMemo(
    () => decks?.find((d) => d.slug === targetDeckSlug),
    [decks, targetDeckSlug]
  );

  // Fetch cards for the active chapter (only for Future deck)
  const { cards } = useCardsForDeck(
    isFutureDeck && deck
      ? { variables: { deck: deck._id, edition: activeEdition } }
      : { skip: true }
  );

  // Select 5 random cards for gallery display
  const galleryImages = useMemo(() => {
    if (!isFutureDeck || !cards || cards.length < 5) {
      // Use static images for non-Future decks
      return [
        background1.src,
        background.src,
        background3.src,
        background2.src,
        background4.src,
      ];
    }
    // Shuffle and pick 5 cards for gallery
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5).map((card) => card.img);
  }, [isFutureDeck, cards, activeTab]);

  return (
    <Grid
      css={(theme) => [
        {
          background: theme.colors.soft_gray,
          paddingTop: 60,
          paddingBottom: 120,
          rowGap: 60,
          img: {
            borderRadius: 15,
          },
        },
      ]}
      id="gallery"
      {...props}
    >
      <ScandiBlock
        css={[
          {
            gridColumn: "span 6",
            paddingTop: 15,
            alignItems: "start",
          },
        ]}
      >
        <ArrowedButton>Deck Gallery</ArrowedButton>
      </ScandiBlock>

      <ScandiBlock
        css={[
          {
            gridColumn: "span 6",
            alignItems: "initial",
            paddingTop: 15,
            height: 241,
          },
        ]}
      >
        <Text typography="paragraphBig" css={[{ paddingBottom: 120 }]}>
          Loved this deck? Continue the story with these collector's favourites.
        </Text>
      </ScandiBlock>
      <Grid css={{ gridColumn: "1/-1", gap: 30 }}>
        <img
          css={[
            {
              gridColumn: "span 3",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
            },
          ]}
          src={galleryImages[0]}
          alt=""
        />
        <img
          css={[
            {
              gridColumn: "span 6",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
              gridRow: "span 2",
            },
          ]}
          src={galleryImages[1]}
          alt=""
        />
        <img
          css={[
            {
              gridColumn: "span 3",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
            },
          ]}
          src={galleryImages[2]}
          alt=""
        />
        <img
          css={[
            {
              gridColumn: "span 3",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
            },
          ]}
          src={galleryImages[3]}
          alt=""
        />
        <img
          css={[
            {
              gridColumn: "span 3",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
            },
          ]}
          src={galleryImages[4]}
          alt=""
        />
      </Grid>
    </Grid>
  );
};

export default Gallery;
