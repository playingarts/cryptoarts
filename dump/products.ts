import { Deck } from "../source/graphql/schemas/deck";
import {
  MongoProduct,
  Product,
  getProduct,
} from "../source/graphql/schemas/product";
import { connect } from "../source/mongoose";
import { populateDeckId } from "./_utils";

const generateMongoId = (shopifyId: string) =>
  "0".repeat(24 - shopifyId.length) + shopifyId;

const deckPrice: MongoProduct["price"] = { eur: 14.95, usd: 19.95 };
const sheetPrice: MongoProduct["price"] = { eur: 34.95, usd: 39.95 };

export let products: MongoProduct[] = [
  {
    // _id: generateMongoId("22124868567121"),
    _id: generateMongoId("51478895722836"),
    title: "Edition Zero",
    deck: "zero",
    short: "Zero",
    price: deckPrice,
    status: "low",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-zero.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-zero-02.png",
    info: "Deck of Cards",
  },
  {
    // _id: generateMongoId("12381601988689"),
    _id: generateMongoId("51478897819988"),
    title: "Edition One",
    deck: "one",
    short: "One",
    price: deckPrice,
    status: "instock",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-one.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-one-02.png",
    info: "Deck of Cards",
    description: "A timeless classic, loved by all.",
  },
  {
    // _id: generateMongoId("12381603004497"),
    _id: generateMongoId("51478897688916"),
    title: "Edition Two",
    deck: "two",
    short: "Two",
    price: deckPrice,
    status: "instock",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-two.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-two-02.png",
    info: "Deck of Cards",
  },
  {
    // _id: generateMongoId("24231765639"),
    _id: generateMongoId("51478905487700"),
    title: "Edition Three",
    deck: "three",
    short: "Three",
    price: deckPrice,
    status: "instock",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-three.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-three-02.png",
    info: "Deck of Cards",
  },
  {
    // _id: generateMongoId("24231824903"),
    _id: generateMongoId("24231824903"),
    title: "Special Edition",
    deck: "special",
    short: "Special",
    price: deckPrice,
    status: "soldout",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special-02.png",
    info: "Deck of Cards",
    description: "Community-chosen designs, truly iconic.",
  },
  {
    // _id: generateMongoId("42012346384571"),
    _id: generateMongoId("51478894641492"),
    title: "Future Edition I",
    deck: "future",
    short: "Future",
    price: deckPrice,
    status: "instock",
    type: "deck",
    description: "Bold visions of tomorrow, today.",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-i.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-i-02.png",
    info: "Deck of Cards",
  },
  {
    // _id: generateMongoId("42012347072699"),
    _id: generateMongoId("51478894575956"),
    title: "Future Edition II",
    short: "Future II",
    deck: "future-ii",
    price: deckPrice,
    status: "low",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-ii.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-ii-02.png",
    info: "Deck of Cards",
  },
  {
    // _id: generateMongoId("42583867687099"),
    _id: generateMongoId("51478894117204"),
    title: "Crypto Edition",
    deck: "crypto",
    short: "Crypto",
    price: deckPrice,
    status: "soon",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-crypto.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-crypto.png",
    info: "Deck of Cards",
  },
  {
    // _id: generateMongoId("21312509018193"),
    _id: generateMongoId("51478897066324"),
    title: "3x Edition Bundle",
    decks: ["one", "two", "three"],
    short: "3x Edition",
    price: { eur: 34.95, usd: 39.95 },
    fullPrice: { eur: 54.95, usd: 59.85 },
    labels: ["Save 33%"],
    status: "bundle",
    type: "bundle",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/bundle-01.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/bundle-01.png",
    info: "One + Two + Three",
  },
  {
    // _id: generateMongoId("42012378595515"),
    _id: generateMongoId("51478894248276"),
    title: "2x Future Bundle",
    decks: ["future", "future-ii"],
    short: "2x Future",
    price: { eur: 24.95, usd: 29.95 },
    fullPrice: { eur: 34.9, usd: 39.9 },
    labels: ["Save 25%"],
    status: "bundle",
    type: "bundle",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/bundle-02.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/bundle-02.png",
    info: "Future Editions I + II",
  },
  {
    // _id: generateMongoId("32395075846192"),
    _id: generateMongoId("32395075846192"),
    title: "Edition Zero",
    deck: "zero",
    short: "Zero sheet",
    price: sheetPrice,
    status: "soldout",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-zero.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-zero.png",
    info: "Uncut Sheet",
  },
  {
    // _id: generateMongoId("24234305607"),
    _id: generateMongoId("51478903816532"),
    title: "Edition One",
    deck: "one",
    short: "One sheet",
    price: sheetPrice,
    status: "sheet",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-one.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-one.png",
    info: "Uncut Sheet",
  },
  {
    // _id: generateMongoId("24234334087"),
    _id: generateMongoId("51478902276436"),
    title: "Edition Two",
    deck: "two",
    short: "Two sheet",
    price: sheetPrice,
    status: "sheet",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-two.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-two.png",
    info: "Uncut Sheet",
  },
  {
    // _id: generateMongoId("24235977607"),
    _id: generateMongoId("51478901915988"),
    title: "Edition Three",
    deck: "three",
    short: "Three sheet",
    price: sheetPrice,
    status: "sheet",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-three.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-three.png",
    info: "Uncut Sheet",
  },
  {
    // _id: generateMongoId("24236650759"),
    _id: generateMongoId("24236650759"),
    title: "Special Edition",
    deck: "special",
    short: "Special sheet",
    price: sheetPrice,
    status: "soldout",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-special.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-special.png",
    info: "Uncut Sheet",
  },
  {
    // _id: generateMongoId("39371993874480"),
    _id: generateMongoId("39371993874480"),
    title: "Future Edition I",
    deck: "future",
    short: "Future sheet",
    price: sheetPrice,
    status: "soldout",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-future-i.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-future-i.png",
    info: "Uncut Sheet",
  },
  {
    title: "Future Edition II",
    // _id: generateMongoId("39371995807792"),
    _id: generateMongoId("39371995807792"),
    deck: "future-ii",
    short: "Future II sheet",
    type: "sheet",
    price: sheetPrice,
    status: "soldout",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-future-ii.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-future-ii.png",
    info: "Uncut Sheet",
  },
];

const dump = async () => {
  await connect();

  await Product.deleteMany();

  const getDeckId = async (deck: string) => {
    const { _id } = (await Deck.findOne({ slug: deck }).lean()) || {
      _id: undefined,
    };

    if (!_id) {
      throw new Error(
        `Cannot reference deck: ${deck}.`
        // `Cannot reference deck: ${deck} in: ${JSON.stringify(item)}.`
      );
    }

    return _id;
  };
  const notBundles = await Promise.all(
    products
      .filter((prod) => prod.type !== "bundle")
      .map(async (prod) => {
        let deck = prod.deck && (await getDeckId(prod.deck));

        return { ...prod, deck };
      })
  );

  await Product.insertMany(notBundles);

  const bundles = await Promise.all(
    products
      .filter((prod) => prod.type === "bundle")
      .map(async (item) => {
        let decks = item.decks;
        decks =
          decks &&
          (await Promise.all(
            decks.map(async (deck) => {
              const deckId = await getDeckId(deck);

              const product = await getProduct({ deck: deckId });
              return product?._id;
            })
          )).filter((id): id is string => id !== undefined);
        return { ...item, decks };
      })
  );

  await Product.insertMany(bundles);
};

export default dump;
