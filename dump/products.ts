import { Product } from "../source/graphql/schemas/product";
import { connect } from "../source/mongoose";
import { populateDeckId } from "./_utils";

const dump = async () => {
  await connect();

  await Product.deleteMany();

  let products = [
    {
      title: "Stuff",
      price: 10.0,
      image:
        "https://s3.amazonaws.com/img.playingarts.com/files/store-bag/future-case.jpg",
      info: "Random thing",
    },
    {
      title: "Crypto deck",
      price: 99.99,
      image:
        "https://s3.amazonaws.com/img.playingarts.com/files/products/deck-edition-three.png",
      deck: "crypto",
      info: "Deck of Cards",
    },
  ];

  products = await populateDeckId<typeof products[0]>(products);

  await Product.insertMany(products);
};

export default dump;
