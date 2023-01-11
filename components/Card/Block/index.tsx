import { FC } from "react";
import { OwnedCard } from "../../../pages/[deckId]";
import { breakpoints } from "../../../source/enums";
import Card from "../../Card";
import Grid, { Props as GridProps } from "../../Grid";
import Line from "../../Line";
import Link from "../../Link";
import Quote from "../../Quote";
import { useSize } from "../../SizeProvider";
import Text from "../../Text";
import Podcast from "../../_composed/Podcast";
import CardInfo from "../Info";

interface Props extends GridProps {
  card: GQL.Card;
  deck: GQL.Deck;
  cardOfTheDay?: boolean;
  stick?: number;
  ownedCards?: OwnedCard[];
  contest?: boolean;
}

const CardBlock: FC<Props> = ({
  stick,
  cardOfTheDay,
  deck,
  card,
  ownedCards,
  contest,
  ...props
}) => {
  const { width } = useSize();

  const ComposedCard = (
    <Card
      key={card._id}
      card={card}
      animated={true}
      size="big"
      interactive={true}
      noInfo={true}
      owned={
        ownedCards &&
        ownedCards.findIndex(
          (owned) =>
            (owned.suit.toLowerCase() === card.suit &&
              owned.value === card.value) ||
            (card.erc1155 && card.erc1155.token_id === owned.token_id)
        ) !== -1
      }
      css={[
        {
          marginLeft: "auto",
          marginRight: "auto",
        },
      ]}
    />
  );

  return (
    <Grid
      {...props}
      short={true}
      css={(theme) => ({
        gap: theme.spacing(3),
        color: theme.colors.text_subtitle_light,
        [theme.mq.sm]: {
          [theme.maxMQ.md]: {
            gridTemplateColumns: `repeat(7, ${theme.spacing(7.5)}px)`,
          },
        },
        [theme.maxMQ.sm]: {
          columnGap: 0,
          paddingLeft: theme.spacing(1.5),
          paddingRight: theme.spacing(1.5),
        },
      })}
    >
      {cardOfTheDay && width < breakpoints.md && (
        <div css={[{ gridColumn: "1/-1" }]}>
          <Text component="div" variant="h6">
            Card of the day
          </Text>
          <Line palette="dark" spacing={1} />
        </div>
      )}
      <div
        css={(theme) => [
          {
            gridColumn: "1 / -1",
            [theme.maxMQ.md]: {
              [theme.mq.sm]: {
                gridColumn: "2 / span 5",
              },
            },
            [theme.mq.md]: {
              gridColumn: "span 4",
            },
          },
          stick !== undefined && {
            [theme.mq.md]: {
              position: "sticky",
            },
            top: theme.spacing(stick),
            alignSelf: "flex-start",
          },
        ]}
      >
        {cardOfTheDay ? (
          <Link href={`/${card.deck.slug}/${card.artist.slug}`}>
            {ComposedCard}
          </Link>
        ) : (
          ComposedCard
        )}
      </div>
      <div
        css={(theme) => ({
          alignSelf: "center",

          position: "relative",
          [theme.maxMQ.sm]: {
            // marginTop: theme.spacing(2),
          },

          gridColumn: "-1 / 1",
          [theme.mq.sm]: {
            [theme.maxMQ.md]: {
              marginTop: theme.spacing(5),
            },
            gridColumn: "span 7",
          },
          [theme.mq.md]: [
            cardOfTheDay && {
              paddingTop: theme.spacing(20),
            },

            {
              gridColumn: "span 5 / -1",
            },
          ],
        })}
      >
        {cardOfTheDay && width >= breakpoints.md && (
          <div
            css={(theme) => [
              {
                position: "absolute",
                left: 0,
                right: 0,
                top: theme.spacing(6),
              },
            ]}
          >
            <Text component="div" variant="h6">
              Card of the day
            </Text>
            <Line palette="dark" spacing={1} />
          </div>
        )}
        <CardInfo
          cardOfTheDay={cardOfTheDay}
          contest={contest}
          artist={card.artist}
          deck={deck}
          cardId={card._id}
        />
        {cardOfTheDay && (
          <Quote
            palette="dark"
            key={card._id}
            fullArtist={true}
            artist={card.artist}
            withoutName={true}
            vertical={true}
            truncate={7}
            css={(theme) => [
              !cardOfTheDay && {
                [theme.maxMQ.sm]: {
                  marginBottom: theme.spacing(3),
                },
              },
            ]}
          >
            {card.info}
          </Quote>
        )}
      </div>
      {!contest && !cardOfTheDay && (
        <div
          css={(theme) => ({
            gridColumn: "span 7 / -1",
            [theme.mq.md]: {
              gridColumn: "span 5 / -1",
            },
          })}
        >
          <Quote
            palette="dark"
            key={card._id}
            fullArtist={true}
            artist={card.artist}
            withoutName={true}
            vertical={true}
            truncate={7}
            css={(theme) => [
              !cardOfTheDay && {
                [theme.maxMQ.sm]: {
                  marginBottom: theme.spacing(3),
                },
              },
            ]}
          >
            {card.info}
          </Quote>
          {!cardOfTheDay && (
            <Podcast
              css={(theme) => ({ marginTop: theme.spacing(5) })}
              smallTitle={true}
              withoutAction={true}
              title="PODCAST"
              name={card.artist.name}
            />
          )}
        </div>
      )}
    </Grid>
  );
};

export default CardBlock;
