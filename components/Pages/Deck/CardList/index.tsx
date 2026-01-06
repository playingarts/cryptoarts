import { FC, Fragment, HTMLAttributes, memo, useEffect, useState } from "react";
import Grid from "../../../Grid";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Text from "../../../Text";
import { useCards } from "../../../../hooks/card";
import { useRouter } from "next/router";
import Card from "../../../Card";
import { useSize } from "../../../SizeProvider";
import { breakpoints } from "../../../../source/enums";
import Dot from "../../../Icons/Dot";
import background from "../../../../mocks/images/backgroundImage.png";
import { usePalette } from "../DeckPaletteContext";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import Pop from "../../CardPage/Pop";
import { useDeck } from "../../../../hooks/deck";

const ListItem: FC<{
  index: number;
  card: GQL.Card;
  range: number;
  cards: GQL.Card[];
}> = ({ index, card, range, cards }) => {
  const { palette } = usePalette();
  const {
    query: { deckId },
  } = useRouter();

  const [show, setShow] = useState(false);

  const [randCard, setRandCard] = useState<GQL.Card>();

  useEffect(() => {
    const rand =
      index !== 0 &&
      (index + 1) % range === 0 &&
      Math.floor(Math.random() * range) + index - range;

    if (rand) {
      setRandCard(cards[rand]);
    } else {
      setRandCard(undefined);
    }
  }, [range, index]);

  return (
    <Fragment key={"CardListFragment" + index}>
      <Card
        onClick={() => setShow(true)}
        size="preview"
        key={card._id + index + "card"}
        card={{ ...card, deck: { slug: deckId } as unknown as GQL.Deck }}
        css={[{ width: 300 }]}
      />
      <MenuPortal show={show}>
        {typeof deckId === "string" ? (
          <Pop
            close={() => setShow(false)}
            cardSlug={card.artist.slug}
            deckId={deckId}
          />
        ) : null}
      </MenuPortal>
      {randCard && (
        <Grid css={[{ width: "100%" }]} key={card._id + "quote" + index}>
          <img
            src={background.src}
            alt=""
            css={{
              width: 300,
              height: 300,
              gridColumn: "2/6",
              borderRadius: 15,
            }}
          />
          <div
            css={(theme) => [
              {
                gridColumn: "span 6",
                marginTop: 30,
              },
            ]}
          >
            <div css={[{ display: "flex", gap: 30 }]}>
              <img
                src={randCard.artist.userpic}
                alt=""
                css={{ width: 80, height: 80 }}
              />
              <div css={(theme) => [{ display: "inline-block" }]}>
                <Text
                  typography="paragraphBig"
                  css={(theme) => [
                    {
                      color:
                        theme.colors[palette === "dark" ? "white75" : "black"],
                    },
                  ]}
                >
                  {randCard.artist.name}
                </Text>
                <Text
                  typography="paragraphSmall"
                  css={(theme) => [
                    {
                      color:
                        theme.colors[palette === "dark" ? "white75" : "black"],
                    },
                  ]}
                >
                  {randCard.artist.country}
                </Text>
              </div>
            </div>
            <Text
              typography="newParagraph"
              css={(theme) => [
                {
                  marginTop: 60,
                  color: theme.colors[palette === "dark" ? "white75" : "black"],
                },
              ]}
            >
              {randCard.artist.info}
            </Text>

            <Text
              typography="linkNewTypography"
              css={(theme) => [
                {
                  marginTop: 30,
                  color: theme.colors[palette === "dark" ? "white75" : "black"],
                },
              ]}
            >
              Discover the artwork <Dot />
            </Text>
          </div>
        </Grid>
      )}
    </Fragment>
  );
};

const List = () => {
  const {
    query: { deckId },
  } = useRouter();

  const { deck } = useDeck({ variables: { slug: deckId } });

  const { cards } = useCards(deck && { variables: { deck: deck._id } });

  const { width } = useSize();

  const [range, setRange] = useState(4);

  useEffect(() => {
    setRange(width >= breakpoints.md ? 12 : width >= breakpoints.sm ? 8 : 4);
  }, [width]);

  return (
    cards && (
      <div
        css={[
          {
            display: "flex",
            gridColumn: "1/-1",
            columnGap: 30,
            flexWrap: "wrap",
            rowGap: 60,
            marginTop: 90,
            justifyContent: "center",
          },
        ]}
      >
        {cards.map((card, index) => (
          <ListItem key={card._id} {...{ card, index, range, cards }} />
        ))}
      </div>
    )
  );
};

const CardList: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { palette } = usePalette();
  return (
    <Grid
      css={(theme) => [
        {
          paddingTop: 60,
          background:
            palette === "dark"
              ? theme.colors.darkBlack
              : theme.colors["pale_gray"],
        },
      ]}
      id="cards"
      {...props}
    >
      <div css={[{ gridColumn: "span 6" }]}>
        <ArrowedButton
          css={(theme) => [
            {
              color: theme.colors[palette === "dark" ? "white75" : "black"],
            },
          ]}
        >
          Explore the cards
        </ArrowedButton>
        <Text
          css={(theme) => [
            {
              marginTop: 60,
              color: theme.colors[palette === "dark" ? "white75" : "black"],
            },
          ]}
          typography="paragraphBig"
        >
          A curated showcase of 55 unique artworks, created by 55 international
          artists.
        </Text>
      </div>
      <List />
    </Grid>
  );
};

export default CardList;
