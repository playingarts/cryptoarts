import { Artist } from "../source/graphql/schemas/artist";
import { Card, MongoCard, getCardByImg } from "../source/graphql/schemas/card";
import { Deck, MongoDeck } from "../source/graphql/schemas/deck";

export const createDeck = async (
  slug: string,
  deck: Omit<MongoDeck, "_id">,
  cards: Omit<MongoCard, "_id">[]
) => {
  const currentDeck = await Deck.findOne({ slug });

  if (currentDeck) {
    await Deck.deleteMany({ slug });
    await Card.deleteMany({ deck: currentDeck._id });
  }

  const newDeck = await Deck.create((({ previewCards, ...o }) => o)(deck));

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

      let animator = card.animator || null;

      if (animator) {
        const { _id } = (await Artist.findOne({
          slug: animator as unknown as string,
        })) || {
          _id: undefined,
        };

        if (!_id) {
          throw new Error(
            `Cannot reference animator: ${card.animator} in deck: ${deck.slug}.`
          );
        }

        animator = _id;
      }

      return { ...card, artist, animator, deck: newDeck._id };
    })
  );

  await Card.insertMany(newCards);
  let previewCards = deck.previewCards;

  if (previewCards) {
    const ids = (
      await Promise.all(
        previewCards.map(
          async (img) => (await getCardByImg({ img })) || { _id: undefined }
        )
      )
    ).map((card) => card._id);

    ids.map((_id) => {
      if (!_id) {
        throw new Error(
          `Cannot reference Card: ${JSON.stringify(
            previewCards
          )} in: ${JSON.stringify(newDeck)}.`
        );
      }
    });

    previewCards = ids;
  }

  await Deck.updateOne({ _id: newDeck._id }, { previewCards });
};

export const populateDeckId = async <T>(
  array: Array<Omit<T, "deck"> & { deck?: string }>
) =>
  Promise.all(
    array.map(async (item) => {
      let deck = item.deck;

      if (deck) {
        const { _id } = (await Deck.findOne({ slug: item.deck })) || {
          _id: undefined,
        };

        if (!_id) {
          throw new Error(
            `Cannot reference deck: ${deck} in: ${JSON.stringify(item)}.`
          );
        }

        deck = _id;
      }

      return { ...item, deck };
    })
  );
