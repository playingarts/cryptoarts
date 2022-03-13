import { Deal } from "../source/graphql/schemas/deal";
import { connect } from "../source/mongoose";
import { populateDeckId } from "./_utils";

export let deals = [
  {
    code: "HELLOWORLD",
    hash: "0xeE441DB569670589Dc5Bf22fDDE5Fb05DD2035a5",
    decks: 79,
    deck: "crypto",
  },
];

const dump = async () => {
  await connect();

  await Deal.deleteMany();

  deals = await populateDeckId<typeof deals[0]>(deals);

  await Deal.insertMany(
    deals.map((deal) => ({ ...deal, hash: deal.hash.toLowerCase() }))
  );
};

export default dump;
