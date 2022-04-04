import { MongoProduct, Product } from "../source/graphql/schemas/product";
import { connect } from "../source/mongoose";
import { populateDeckId } from "./_utils";

const generateMongoId = (shopifyId: string) =>
  "0".repeat(24 - shopifyId.length) + shopifyId;

export let products: MongoProduct[] = [
  {
    _id: generateMongoId("22124868567121"),
    title: "Edition Zero",
    deck: "zero",
    short: "Zero",
    price: 14.95,
    status: "instock",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-zero.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-zero-02.jpg",
    info: "Deck of Cards",
  },
  {
    _id: generateMongoId("12381601988689"),
    title: "Edition One",
    deck: "one",
    short: "One",
    price: 14.95,
    status: "instock",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-one.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-one-02.jpg",
    info: "Deck of Cards",
  },
  {
    _id: generateMongoId("12381603004497"),
    title: "Edition Two",
    deck: "two",
    short: "Two",
    price: 14.95,
    status: "instock",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-two.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-two-02.jpg",
    info: "Deck of Cards",
  },
  {
    _id: generateMongoId("24231765639"),
    title: "Edition Three",
    deck: "three",
    short: "Three",
    price: 14.95,
    status: "instock",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-three.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-three-02.jpg",
    info: "Deck of Cards",
  },
  {
    _id: generateMongoId("24231824903"),
    title: "Special Edition",
    deck: "special",
    short: "Special",
    price: 14.95,
    status: "soldout",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special-02.jpg",
    info: "Deck of Cards",
  },
  {
    _id: generateMongoId("42012346384571"),
    title: "Future Edition I",
    deck: "future_i",
    short: "Future",
    price: 14.95,
    status: "instock",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-i.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-i-02.jpg",
    info: "Deck of Cards",
  },
  {
    _id: generateMongoId("42012347072699"),
    title: "Future Edition II",
    short: "Future II",
    deck: "future_ii",
    price: 14.95,
    status: "instock",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-ii.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-ii-02.jpg",
    info: "Deck of Cards",
  },
  {
    _id: generateMongoId("42583867687099"),
    title: "Crypto Edition",
    deck: "crypto",
    short: "Crypto",
    price: 99.95,
    status: "soon",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-crypto-01.jpg",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-crypto.png",
    info: "Deck of Cards",
  },
  {
    _id: generateMongoId("42012378595515"),
    title: "2x Future Bundle",
    deck: "zero",
    short: "Zero",
    price: 24.95,
    status: "bundle",
    type: "bundle",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/bundle-02.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/bundle-02.png",
    info: "Future Editions I + II",
  },
  {
    _id: generateMongoId("21312509018193"),
    title: "3x Edition Bundle",
    deck: "zero",
    short: "Zero",
    price: 34.95,
    status: "bundle",
    type: "bundle",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/bundle-01.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/bundle-01.png",
    info: "Editions One + Two + Three",
  },
  {
    _id: generateMongoId("32395075846192"),
    title: "Edition Zero",
    deck: "zero",
    short: "Zero",
    price: 34.95,
    status: "soldout",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-zero.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-zero.png",
    info: "Uncut Sheet",
  },
  {
    _id: generateMongoId("24234305607"),
    title: "Edition One",
    deck: "one",
    short: "One",
    price: 34.95,
    status: "sheet",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-one.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-one.png",
    info: "Uncut Sheet",
  },
  {
    _id: generateMongoId("24234334087"),
    title: "Edition Two",
    deck: "two",
    short: "Two",
    price: 34.95,
    status: "sheet",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-two.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-two.png",
    info: "Uncut Sheet",
  },
  {
    _id: generateMongoId("24235977607"),
    title: "Edition Three",
    deck: "three",
    short: "Three",
    price: 34.95,
    status: "sheet",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-three.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-three.png",
    info: "Uncut Sheet",
  },
  {
    _id: generateMongoId("24236650759"),
    title: "Special Edition",
    deck: "special",
    short: "Special",
    price: 34.95,
    status: "soldout",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-special.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-special.png",
    info: "Uncut Sheet",
  },
  {
    _id: generateMongoId("39371993874480"),
    title: "Future Edition I",
    deck: "future_i",
    short: "Future",
    price: 34.95,
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
    _id: generateMongoId("39371995807792"),
    deck: "future_ii",
    short: "Future II",
    type: "sheet",
    price: 34.95,
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

  products = await populateDeckId<typeof products[0]>(products);

  await Product.insertMany(products);
};

export default dump;
