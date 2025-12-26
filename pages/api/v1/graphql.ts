import { graphqlHTTP } from "express-graphql";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "../../../source/graphql/schema";
import { connect } from "../../../source/mongoose";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = graphqlHTTP(() => ({
  schema,
  graphiql: process.env.NODE_ENV === "development",
}));

export default async function graphqlHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return handler(req as any, res as any);
}
