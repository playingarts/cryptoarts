import { graphqlHTTP } from "express-graphql";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "../../../source/graphql/schema";
import { connect } from "../../../source/mongoose";
import { rateLimiters } from "../../../lib/rateLimit";

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
  // Apply relaxed rate limiting (100 requests per minute)
  if (rateLimiters.relaxed(req, res)) {
    return; // Request was rate limited
  }

  await connect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return handler(req as any, res as any);
}
