import { createHandler } from "graphql-http/lib/use/fetch";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "../../../source/graphql/schema";
import { connect } from "../../../source/mongoose";
import { rateLimiters } from "../../../lib/rateLimit";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Create the GraphQL handler using graphql-http
const graphqlHandler = createHandler({ schema });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Apply relaxed rate limiting (100 requests per minute)
  if (rateLimiters.relaxed(req, res)) {
    return; // Request was rate limited
  }

  await connect();

  // Convert Next.js request/response to Web API Request/Response
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  // Read the body for POST requests
  let body: string | undefined;
  if (req.method === "POST") {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    body = Buffer.concat(chunks).toString();
  }

  const request = new Request(url, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: req.method !== "GET" && req.method !== "HEAD" ? body : undefined,
  });

  try {
    const response = await graphqlHandler(request);

    // Copy response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Send response
    res.status(response.status);
    const responseBody = await response.text();
    res.send(responseBody);
  } catch (error) {
    console.error("GraphQL error:", error);
    res.status(500).json({ errors: [{ message: "Internal server error" }] });
  }
}
