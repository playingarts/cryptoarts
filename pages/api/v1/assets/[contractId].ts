import { NextApiHandler } from "next";
import {
  getAssets,
  setOnSale,
} from "../../../../source/graphql/schemas/opensea";

const handler: NextApiHandler = async (req, res) => {
  const { contractId, address } = req.query;

  if (typeof contractId !== "string") {
    return res.status(400).json({
      message: "Contract must be a string.",
      code: 400,
      key: "contract",
      value: contractId,
    });
  }

  if (typeof address !== "string") {
    return res.status(400).json({
      message: "Address must be a string.",
      code: 400,
      key: "address",
      value: address,
    });
  }

  try {
    const addressAssets = (await getAssets(contractId)).filter(
      (asset) => asset.owner.address.toLowerCase() === address.toLowerCase()
    );

    res.json(addressAssets.map(setOnSale));
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Try again later.",
      code: 500,
    });
  }
};

export default handler;
