/**
 * Content Resolvers
 */

import { Content } from "../../models";
import { getCard, getCards } from "../schemas/card";

const getDailyCard = async (): Promise<GQL.Card> => {
  const content = await Content.findOne({ key: "dailyCard" });

  const { date, cardId } = (content ? content.data : {}) as {
    date: number;
    cardId: string;
  };

  if (
    process.env.NODE_ENV === "development" ||
    !cardId ||
    !date ||
    new Date(date).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0)
  ) {
    const newCard = await getCards({ limit: 1, shuffle: true, withInfo: true, withMainPhoto: true }).then(
      (cards) => cards[0]
    );

    await Content.findOneAndUpdate(
      { key: "dailyCard" },
      {
        key: "dailyCard",
        data: {
          date: Date.now(),
          cardId: newCard._id,
        },
      },
      { upsert: true }
    );
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log(
        "New daily card: " +
          newCard.value +
          " " +
          newCard.suit +
          " " +
          newCard.deck.slug
      );
    }

    return newCard;
  }

  const card = await getCard({ id: cardId });
  return card as GQL.Card;
};

export const resolvers: GQL.Resolvers = {
  Query: {
    dailyCard: getDailyCard,
  },
};
