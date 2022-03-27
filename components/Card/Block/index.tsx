import { FC, Fragment } from "react";
import Arrowed from "../../Arrowed";
import Button from "../../Button";
import Card from "../../Card";
import Grid, { Props as GridProps } from "../../Grid";
import Line from "../../Line";
import Link from "../../Link";
import Quote from "../../Quote";
import Text from "../../Text";
import CardInfo from "../Info";

interface Props extends GridProps {
  card: GQL.Card;
  deck: GQL.Deck;
  cardOfTheDay?: boolean;
  stick?: number;
}

const CardBlock: FC<Props> = ({
  stick,
  cardOfTheDay,
  deck,
  card,
  ...props
}) => (
  <Grid {...props}>
    <div
      css={(theme) => [
        {
          gridColumn: "span 6",
        },
        stick !== undefined && {
          position: "sticky",
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
        css={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </div>
    <div css={{ gridColumn: "7 / span 5", alignSelf: "center" }}>
      {cardOfTheDay ? (
        <Fragment>
          <div
            css={(theme) => ({
              marginBottom: theme.spacing(5),
              marginTop: theme.spacing(5),
            })}
          >
            <Text component="div" variant="h6" css={{ opacity: 0.5 }}>
              Card of the day
            </Text>
            <Line spacing={1} />
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
            fullArtist={true}
            vertical={true}
            truncate={7}
            css={(theme) => ({ marginTop: theme.spacing(13) })}
          >
            {card.info}
          </Quote>
          <Line spacing={3} />

          <Button component={Link} href={`/${deck.slug}`}>
            View {deck.title}
          </Button>
        </Fragment>
      ) : (
        <CardInfo
          artist={card.artist}
          deck={deck}
          opensea={card.opensea}
          cardId={card._id}
        />
      )}
    </div>
    {!cardOfTheDay && (
      <div css={{ gridColumn: "7 / span 5" }}>
        <Quote
          key={card._id}
          fullArtist={true}
          artist={card.artist}
          withoutName={true}
          vertical={true}
          truncate={7}
        >
          {card.info}
        </Quote>
      </div>
    )}
  </Grid>
);

export default CardBlock;
