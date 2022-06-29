import { connect } from "../source/mongoose";
import { Contract } from "../source/graphql/schemas/contract";
import { populateDeckId } from "./_utils";

export const contracts = [
  {
    name: "cryptoedition",
    address: "0xc22616e971a670e72f35570337e562c3e515fbfe",
    deck: "crypto",
  },
  {
    name: "pa-backsides",
    address: "0x495f947276749ce646f68ac8c248420045cb7b5e",
    deck: "crypto",
  },
];

const dump = async () => {
  await connect();

  await Contract.deleteMany();

  await Contract.insertMany(await populateDeckId(contracts));
};

export default dump;
