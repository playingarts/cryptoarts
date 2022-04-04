import { Deal, MongoDeal } from "../source/graphql/schemas/deal";
import { connect } from "../source/mongoose";
import { populateDeckId } from "./_utils";

let deals: Omit<MongoDeal, "_id">[] = [
  {
    code: "HELLOWORLD",
    hash: "0xeE441DB569670589Dc5Bf22fDDE5Fb05DD2035a5",
    decks: 79,
    deck: "crypto",
  },
  {
    code: "VLADCODE",
    hash: "0x85696c8684f13e4ac9399eec92604c03d708f7f2",
    decks: 999,
    deck: "crypto",
  },
];

if (process.env.NODE_ENV === "production") {
  try {
    deals = require("./deals-real.json");
  } catch (exception) {
    console.error("Failed to get real deals.");
  }
}

const dump = async () => {
  await connect();

  await Deal.deleteMany();

  deals = await populateDeckId<typeof deals[0]>(deals);

  await Deal.insertMany(
    deals.map((deal) => ({
      ...deal,
      ...(deal.hash ? { hash: deal.hash.toLowerCase() } : {}),
    }))
  );
};

export default dump;
