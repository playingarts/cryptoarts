import { FC, Fragment } from "react";
import { OwnedCard } from "../../../pages/[deckId]";
import Arrowed from "../../Arrowed";
import Button from "../../Button";
import Card from "../../Card";
import Grid, { Props as GridProps } from "../../Grid";
import Line from "../../Line";
import Link from "../../Link";
import Quote from "../../Quote";
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
}) => (
  <Grid
    {...props}
    short={true}
    css={(theme) => ({
      gap: theme.spacing(3),
      [theme.mq.sm]: {
        [theme.maxMQ.md]: {
          gridTemplateColumns: `repeat(7, ${theme.spacing(7.5)}px)`,
        },
      },
      [theme.maxMQ.sm]: {
        columnGap: 0,
      },
    })}
  >
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
    </div>
    <div
      css={(theme) => ({
        alignSelf: "center",
        marginTop: theme.spacing(5),
        [theme.maxMQ.sm]: {
          marginTop: theme.spacing(2),
        },

        gridColumn: "-1 / 1",
        [theme.mq.sm]: {
          gridColumn: "span 7",
        },
        [theme.mq.md]: {
          marginTop: 0,
          gridColumn: "span 5 / -1",
        },
      })}
    >
      {cardOfTheDay ? (
        <Fragment>
          <div
            css={(theme) => ({
              marginBottom: theme.spacing(5),
              marginTop: theme.spacing(5),
              [theme.maxMQ.md]: {
                marginTop: 0,
              },
            })}
          >
            <Text component="div" variant="h6" css={{ opacity: 0.5 }}>
              Card of the day
            </Text>
            <Line palette="dark" spacing={1} />
          </div>
          <Text component="h2" css={{ margin: 0 }}>
            {card.artist.name}
          </Text>
          <Text
            component={Link}
            href={`/${deck.slug}`}
            variant="label"
            css={{ opacity: 0.5 }}
          >
            <Arrowed>For {deck.title}</Arrowed>
          </Text>
          <Quote
            palette="dark"
            fullArtist={true}
            vertical={true}
            truncate={7}
            css={(theme) => ({
              marginTop: theme.spacing(13),
            })}
          >
            {card.info}
          </Quote>
          <Line palette="dark" spacing={3} />

          <Button component={Link} href={`/${deck.slug}`}>
            View {deck.title}
          </Button>
        </Fragment>
      ) : (
        <CardInfo
          contest={contest}
          artist={card.artist}
          deck={deck}
          cardId={card._id}
        />
      )}
    </div>
    {!cardOfTheDay && !contest && (
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
            {
              [theme.maxMQ.sm]: {
                marginBottom: theme.spacing(3),
              },
            },
          ]}
        >
          {card.info}
        </Quote>
        <Podcast
          css={(theme) => ({ marginTop: theme.spacing(5.5) })}
          smallTitle={true}
          withoutAction={true}
          title="PODCAST"
          name={card.artist.name}
        />
      </div>
    )}
  </Grid>
);

export default CardBlock;
