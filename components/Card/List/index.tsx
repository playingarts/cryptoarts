import { useRouter } from "next/router";
import { FC, HTMLAttributes } from "react";
import { OwnedCard } from "../../../pages/[deckId]";
import Card from "../../Card";
import Grid from "../../Grid";
import Link from "../../Link";

export interface Props extends HTMLAttributes<HTMLElement> {
  status:
    | "initializing"
    | "unavailable"
    | "notConnected"
    | "connecting"
    | "connected";
  metamaskProps?: {
    account: string | null;
    ownedCards: OwnedCard[];
  };
  cards: GQL.Card[];
  sorted?: boolean;
}

const CardList: FC<Props> = ({
  metamaskProps,
  cards,
  sorted,
  status,
  ...props
}) => {
  const { query } = useRouter();

  return (
    <Grid {...props}>
      <div
        css={(theme) => ({
          gridColumn: "1/-1",
          display: "flex",
          gap: "inherit",
          rowGap: theme.spacing(6),
          flexWrap: "wrap",
          justifyContent: "center",
        })}
      >
        {cards.map((card) => (
          <Link key={card._id} href={`/${query.deckId}/${card.artist.slug}`}>
            <Card
              sorted={sorted}
              css={(theme) => ({
                color:
                  status === "connected" && metamaskProps
                    ? theme.colors.text_subtitle_light
                    : theme.colors.text_subtitle_dark,
                ":hover": {
                  color:
                    status === "connected" && metamaskProps
                      ? theme.colors.text_title_light
                      : theme.colors.text_title_dark,
                },
              })}
              card={card}
              owned={
                metamaskProps &&
                status === "connected" &&
                metamaskProps.ownedCards.findIndex(
                  (owned) =>
                    (owned.suit.toLowerCase() === card.suit &&
                      owned.value === card.value) ||
                    (card.erc1155 && card.erc1155.token_id === owned.token_id)
                ) !== -1
              }
            />
          </Link>
        ))}
      </div>
    </Grid>
  );
};

export default CardList;
