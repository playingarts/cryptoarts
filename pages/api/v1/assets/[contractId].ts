import { NextApiHandler } from "next";
import { getContract } from "../../../../source/graphql/schemas/contract";
import { getAssets, setCard } from "../../../../source/graphql/schemas/opensea";
import { getListings } from "../../../../source/graphql/schemas/listing";

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
    const contract = await getContract({ address: contractId });

    if (!contract) {
      throw 500;
    }

    const addressAssets = (
      await getAssets(
        contract.address.toLowerCase(),
        contract.name,
        address.toLowerCase()
      )
    ).map((asset) => ({
      ...asset,
      owner: asset.owners[0],
    }));

    res.json(
      await Promise.all(
        addressAssets.map(async (asset) => {
          const listings = await getListings({
            addresses: [asset.contract],
            tokenIds: [asset.identifier],
          });

          return setCard(contractId)({
            ...asset,
            on_sale: listings.length > 0,
            traits: asset.traits ? asset.traits : [],
          });
        })
      )
    );
  } catch {
    res.status(500).json({
      message: "Something went wrong. Try again later.",
      code: 500,
    });
  }
};

export default handler;
