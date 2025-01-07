import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  // Check for secret to confirm this is a valid request
  if (!req.query.secret || req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const pages: string[] = JSON.parse((req.query as { pages: string }).pages);
  console.log("revalidating ");

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    for (const page of pages) {
      await res.revalidate(page);
    }
    return res.json({ revalidated: true });
  } catch {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
};
export default handler;
