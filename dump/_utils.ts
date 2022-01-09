import { Artist } from "../source/graphql/schemas/artist";
import { Card, MongoCard } from "../source/graphql/schemas/card";
import { Deck } from "../source/graphql/schemas/deck";

export const createDeck = async (
  deck: Omit<GQL.Deck, "_id">,
  cards: Omit<MongoCard, "_id">[]
) => {
  const newDeck = await Deck.create(deck);

  const newCards = await Promise.all(
    cards.map(async (card) => {
      let artist = card.artist;

      if (card.artist) {
        const { _id } = (await Artist.findOne({ slug: card.artist })) || {
          _id: undefined,
        };

        if (!_id) {
          throw new Error(
            `Cannot reference artist: ${card.artist} in deck: ${deck.slug}.`
          );
        }

        artist = _id;
      }

      return { ...card, artist, deck: newDeck._id };
    })
  );

  await Card.insertMany(newCards);
};
