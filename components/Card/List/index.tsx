import { useRouter } from "next/router";
import { FC, HTMLAttributes, SetStateAction, useEffect } from "react";
import { useCards } from "../../../hooks/card";
import { OwnedCard } from "../../../pages/[deckId]";
import { Asset } from "../../../source/graphql/schemas/opensea";
import Card from "../../Card";
import Grid from "../../Grid";
import Link from "../../Link";

interface Props extends HTMLAttributes<HTMLElement> {
  deckId: string;
  metamaskProps?: {
    account: string | null;
    ownedCards: OwnedCard[];
  };
  setOwnedCards?: (value: SetStateAction<OwnedCard[]>) => void;
}

const CardList: FC<Props> = ({
  deckId,
  metamaskProps,
  setOwnedCards,
  ...props
}) => {
  const { query } = useRouter();
  const { cards, loading } = useCards({
    variables: { deck: deckId },
  });

  useEffect(() => {
    if (!setOwnedCards || !cards || !metamaskProps) {
      return;
    }

    Promise.all(
      cards
        .filter((card) => card.erc1155)
        .flatMap(async (card) => {
          if (!card.erc1155) {
            return { value: "", suit: "", token_id: "" };
          }

          const res: Asset = await (
            await fetch(
              `https://api.opensea.io/api/v1/asset/${card.erc1155.contractAddress}/${card.erc1155.token_id}/?account_address=${metamaskProps.account}`
            )
          ).json();
          if (res.ownership) {
            return { value: "", suit: "", token_id: res.token_id };
          }
          return { value: "", suit: "", token_id: "" };
        })
    ).then((compl) =>
      setOwnedCards((prev) => [
        ...prev.filter(
          (ownd) =>
            compl.findIndex((erc) => erc.token_id === ownd.token_id) === -1
        ),
        ...compl,
      ])
    );
  }, [cards]);

  if (loading || !cards) {
    return null;
  }

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
              css={(theme) => ({
                color: metamaskProps
                  ? theme.colors.text_subtitle_light
                  : theme.colors.text_subtitle_dark,
                ":hover": {
                  color: metamaskProps
                    ? theme.colors.text_title_light
                    : theme.colors.text_title_dark,
                },
              })}
              card={card}
              owned={
                metamaskProps &&
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
