import { FC } from "react";
import { OwnedCard } from "../../../pages/[deckId]";
import { breakpoints } from "../../../source/enums";
import Arrowed from "../../Arrowed";
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
      // size={"big"}
      {...(!cardOfTheDay && { size: "big" })}
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
      css={(theme) => [
        !cardOfTheDay && {
          [theme.mq.sm]: {
            [theme.maxMQ.md]: {
              gridTemplateColumns: `repeat(7, ${theme.spacing(7.5)}px)`,
            },
          },
        },
        {
          rowGap: theme.spacing(2),
          color: theme.colors.text_subtitle_light,

          [theme.maxMQ.sm]: {
            columnGap: 0,
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5),
          },
        },
      ]}
    >
      {cardOfTheDay && width < breakpoints.md && (
        <div
          css={(theme) => [
            {
              gridColumn: "span 8",
              marginBottom: 30,
              color: theme.colors.text_subtitle_dark,
              [theme.maxMQ.md]: {
                paddingLeft: theme.spacing(4),
                paddingRight: theme.spacing(4),
              },
              [theme.maxMQ.sm]: {
                marginBottom: 10,
                paddingLeft: theme.spacing(0),
                paddingRight: theme.spacing(0),
              },
            },
          ]}
        >
          <Text component="div" variant="h6">
            Card of the day
          </Text>
        </div>
      )}
      <div
        css={(theme) => [
          !cardOfTheDay && {
            [theme.maxMQ.md]: {
              marginTop: theme.spacing(3),
            },
          },
          {
            gridColumn: "1 / -1",

            [theme.mq.md]: {
              gridColumn: "span 4",
            },
            [theme.maxMQ.sm]: {
              marginTop: theme.spacing(0),
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
              marginTop: theme.spacing(3),
            },
            // gridColumn: "span 7",
          },
          [theme.mq.md]: [
            // !cardOfTheDay && {
            //   paddingTop: theme.spacing(10),
            // },
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
                color: theme.colors.text_subtitle_dark,
                marginBottom: theme.spacing(2),
              },
            ]}
          >
            <Text component="div" variant="h6">
              Card of the day
            </Text>
            {/* <Line palette="light" spacing={1} /> */}
          </div>
        )}
        <CardInfo
          cardOfTheDay={cardOfTheDay}
          contest={contest}
          artist={card.artist}
          deck={deck}
        />
        {cardOfTheDay && (
          <div
            css={(theme) => [
              {
                [theme.maxMQ.md]: {
                  paddingLeft: theme.spacing(4),
                  paddingRight: theme.spacing(4),
                  marginTop: theme.spacing(4),
                },
                [theme.maxMQ.sm]: {
                  marginTop: 0,
                  paddingLeft: theme.spacing(0),
                  paddingRight: theme.spacing(0),
                },
              },
            ]}
          >
            <Line
              palette="light"
              css={(theme) => ({
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(2.5),
              })}
            />
            <Text
              component={Link}
              href={`/${card.deck.slug}`}
              variant="label"
              css={(theme) => [
                {
                  opacity: 0.5,
                  display: "inline-block",
                  color: theme.colors.black,
                  transition: theme.transitions.fast("opacity"),
                  "&:hover": {
                    opacity: 1,
                  },
                },
              ]}
            >
              <Arrowed>For {card.deck.title}</Arrowed>
            </Text>
          </div>
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
                  marginBottom: theme.spacing(2),
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
