import { NextRequest, NextResponse } from "next/server";
import { getContract } from "../../../../../source/graphql/schemas/contract";
import {
  getAssets,
  setCard,
} from "../../../../../source/graphql/schemas/opensea";
import { getListings } from "../../../../../source/graphql/schemas/listing";
import { connect } from "../../../../../source/mongoose";

interface RouteParams {
  params: Promise<{
    contractId: string;
  }>;
}

/**
 * Get assets for a specific contract and address
 *
 * GET /api/v1/assets/[contractId]?address=xxx
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  await connect();

  const { contractId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");

  if (typeof contractId !== "string") {
    return NextResponse.json(
      {
        message: "Contract must be a string.",
        code: 400,
        key: "contract",
        value: contractId,
      },
      { status: 400 }
    );
  }

  if (typeof address !== "string") {
    return NextResponse.json(
      {
        message: "Address must be a string.",
        code: 400,
        key: "address",
        value: address,
      },
      { status: 400 }
    );
  }

  try {
    const contract = await getContract({ address: contractId });

    if (!contract) {
      return NextResponse.json(
        {
          message: "Contract not found.",
          code: 404,
        },
        { status: 404 }
      );
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

    const results = await Promise.all(
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
    );

    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      {
        message: "Something went wrong. Try again later.",
        code: 500,
      },
      { status: 500 }
    );
  }
}
