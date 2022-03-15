import { Product } from "../source/graphql/schemas/product";
import { connect } from "../source/mongoose";
import { populateDeckId } from "./_utils";

export let products = [
  {
    title: "Edition Zero",
    deck: "zero",
    short: "Zero",
    price: 14.95,
    status: "instock",
    id: "22124868567121",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-zero.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-zero-2.png",
    info: "Deck of Cards",
  },
  {
    title: "Edition One",
    deck: "one",
    short: "One",
    price: 14.95,
    status: "instock",
    id: "12381601988689",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-one.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-one.png",
    info: "Deck of Cards",
  },
  {
    title: "Edition Two",
    deck: "two",
    short: "Two",
    price: 14.95,
    status: "instock",
    id: "12381603004497",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-two.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-two.png",
    info: "Deck of Cards",
  },
  {
    title: "Edition Three",
    deck: "three",
    short: "Three",
    price: 14.95,
    status: "instock",
    id: "24231765639",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-three.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-three.png",
    info: "Deck of Cards",
  },
  {
    title: "Special Edition",
    deck: "special",
    short: "Special",
    price: 14.95,
    status: "soldout",
    id: "24231824903",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special.png",
    info: "Deck of Cards",
  },
  {
    title: "Future Edition I",
    deck: "future_i",
    short: "Future",
    price: 14.95,
    status: "instock",
    id: "42012346384571",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-i.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-i.png",
    info: "Deck of Cards",
  },
  {
    title: "Future Edition II",
    short: "Future II",
    deck: "future_ii",
    price: 14.95,
    status: "instock",
    id: "42012347072699",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-ii.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-ii.png",
    info: "Deck of Cards",
  },
  {
    title: "Crypto Edition",
    deck: "crypto",
    short: "Crypto",
    price: 99.95,
    status: "soon",
    id: "39371978539056",
    type: "deck",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-crypto.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-crypto.png",
    info: "Deck of Cards",
  },
  {
    title: "2x Future Bundle",
    deck: "zero",
    short: "Zero",
    price: 24.95,
    status: "bundle",
    id: "42012378595515",
    type: "bundle",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-bundle-2.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-bundle-2.png",
    info: "Decks: Future Editions I + II",
  },
  {
    title: "3x Edition Bundle",
    deck: "zero",
    short: "Zero",
    price: 34.95,
    status: "bundle",
    id: "21312509018193",
    type: "bundle",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-bundle-3.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-bundle-3.png",
    info: "Decks: Editions One + Two + Three",
  },
  {
    title: "Edition Zero",
    deck: "zero",
    short: "Zero",
    price: 34.95,
    status: "soldout",
    id: "32395075846192",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-zero.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-zero.png",
    info: "Uncut Sheet",
  },
  {
    title: "Edition One",
    deck: "one",
    short: "One",
    price: 34.95,
    status: "sheet",
    id: "24234305607",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-one.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-one.png",
    info: "Uncut Sheet",
  },
  {
    title: "Edition Two",
    deck: "two",
    short: "Two",
    price: 34.95,
    status: "sheet",
    id: "24234334087",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-two.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-two.png",
    info: "Uncut Sheet",
  },
  {
    title: "Edition Three",
    deck: "three",
    short: "Three",
    price: 34.95,
    status: "sheet",
    id: "24235977607",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-three.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-three.png",
    info: "Uncut Sheet",
  },
  {
    title: "Special Edition",
    deck: "special",
    short: "Special",
    price: 34.95,
    status: "soldout",
    id: "24236650759",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-special.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-special.png",
    info: "Uncut Sheet",
  },
  {
    title: "Future Edition I",
    deck: "future_i",
    short: "Future",
    price: 34.95,
    status: "soldout",
    id: "39371993874480",
    type: "sheet",
    image:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-future-i.png",
    image2:
      "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-future-i.png",
    info: "Uncut Sheet",
  },
  {
    title: "Future Edition II",
    deck: "future_ii",
    short: "Future II",
    type: "sheet",
    price: 34.95,
    status: "soldout",
    id: "39371995807792",
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
