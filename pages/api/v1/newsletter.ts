import { NextApiHandler } from "next";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const isValidEmail = (email: string): boolean => {
  if (email.length > 254) return false;
  return emailRegex.test(email);
};

export const subscribeEmail: (
  email: string,
  tries?: number
) => Promise<Response> = async (email, tries = 0) =>
  fetch(
    `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUPID}/subscribers`,
    {
      method: "post",
      headers: {
        "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY || "empty",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  ).then((res) => {
    if (res.status === 500) {
      // console.log("Something went wrong during email signup, try again later.");
      return res;
    }

    if (res.status === 400) {
      // console.log("The given data was invalid. Unable to process");
      return res;
    }

    if (tries >= 4) {
      // res.status(5000);
      console.log("Timed out after five tries");
      return res;
    }

    if (res.status === 429) {
      // console.log("The given data was invalid. Unable to process");
      const time = Number(res.headers.get("X-RateLimit-Retry-After"));

      return new Promise<Response>((resolve) =>
        setTimeout(() => resolve(subscribeEmail(email, tries + 1)), time * 1000)
      );
    }

    return res;
  });

const handler: NextApiHandler = async (req, res) => {
  const { email } = req.body;
  // const ip = req.ip as string;
  // console.log(ip);

  if (typeof email !== "string" || !isValidEmail(email)) {
    res.statusMessage = "Email is invalid";
    return res.status(400).json({ error: "Invalid email format" });
  }

  const emailRes = await subscribeEmail(email);

  return res.status(emailRes.status).json({});
};

export default handler;
