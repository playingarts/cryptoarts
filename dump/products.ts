import { Product } from "../source/graphql/schemas/product";
import { connect } from "../source/mongoose";
import { populateDeckId } from "./_utils";

const dump = async () => {
  await connect();

  await Product.deleteMany();

  let products = [
    {
      title: "Edition Zero",
      short: "Zero",
      price: 14.95,
      status: "instock",
      type: "deck",
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-zero.png",
      image2:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-zero-2.png",
      info: "Deck of Cards",
    },
    {
      title: "Edition One",
      short: "One",
      price: 14.95,
      status: "instock",
      type: "deck",
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-one.png",
      image2:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-one.png",
      info: "Deck of Cards",
    },
    {
      title: "Edition Two",
      short: "Two",
      price: 14.95,
      status: "instock",
      type: "deck",
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-two.png",
      image2:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-two.png",
      info: "Deck of Cards",
    },
    {
      title: "Edition Three",
      short: "Three",
      price: 14.95,
      status: "instock",
      type: "deck",
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-three.png",
      image2:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-three.png",
      info: "Deck of Cards",
    },
    {
      title: "Special Edition",
      short: "Special",
      price: 14.95,
      status: "soldout",
      type: "deck",
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special.png",
      image2:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special.png",
      info: "Deck of Cards",
    },
    {
      title: "Future Edition I",
      short: "Future",
      price: 14.95,
      status: "instock",
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
      price: 14.95,
      status: "instock",
      type: "deck",
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-ii.png",
      image2:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-future-ii.png",
      info: "Deck of Cards",
    },
    {
      title: "Crypto Edition",
      short: "Crypto",
      price: 14.95,
      status: "soon",
      type: "deck",
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-crypto.png",
      image2:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-crypto.png",
      info: "Deck of Cards",
    },
    {
      title: "2x Future Bundle",
      short: "Zero",
      price: 24.95,
      status: "bundle",
      type: "bundle",
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-bundle-2.png",
      image2:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-bundle-2.png",
      info: "Future Editions I + II",
    },
    {
      title: "3x Edition Bundle",
      short: "Zero",
      price: 34.95,
      status: "bundle",
      type: "bundle",
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-bundle-3.png",
      image2:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-bundle-3.png",
      info: "Editions One + Two + Three",
    },
    {
      title: "Edition Zero",
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
      title: "Edition One",
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
      title: "Edition Two",
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
      title: "Edition Three",
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
      title: "Special Edition",
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
      title: "Future Edition I",
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

  products = await populateDeckId<typeof products[0]>(products);

  await Product.insertMany(products);
};

export default dump;
