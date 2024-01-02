/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";
import handler from "../../../../../pages/api/v1/newsletter";

const valid = [
  `email@example.com`,
  `firstname.lastname@example.com`,
  `email@subdomain.example.com`,
  `firstname+lastname@example.com`,
  `email@123.123.123.123`,
  `email@[123.123.123.123]`,
  `"email"@example.com`,
  `1234567890@example.com`,
  `email@example-one.com`,
  `_______@example.com`,
  `email@example.name`,
  `email@example.museum`,
  `email@example.co.jp`,
  `firstname-lastname@example.com`,
  `much.”more\ unusual”@example.com`,
  `very.unusual.”@”.unusual.com@example.com`,
  `very.”(),:;<>[]”.VERY.”very@\\ "very”.unusual@strange.example.com`,
];

const invalid = [
  `plainaddress`,
  `#@%^%#$@#$@#.com`,
  `@example.com`,
  `Joe Smith <email@example.com>`,
  `email.example.com`,
  `email@example@example.com`,
  `.email@example.com`,
  `email.@example.com`,
  `email..email@example.com`,
  `あいうえお@example.com`,
  `email@example.com (Joe Smith)`,
  `email@example`,
  `email@-example.com`,
  `email@example.web`,
  `email@111.222.333.44444`,
  `email@example..com`,
  `Abc..123@example.com`,
  `”(),:;<>[\]@example.com`,
  `just”not”right@example.com`,
  `this\ is"really"not\allowed@example.com`,
];

describe("API Endpoint", () => {
  const mockRequestResponse = (email: string) => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY || "empty",
        "Content-Type": "application/json",
      },
    }) as unknown as {
      req: NextApiRequest;
      res: NextApiResponse;
    };
    req.body = { email };
    return { req, res };
  };

  it("should return status 400", async () => {
    const { req, res } = mockRequestResponse("400");
    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("should return status 500", async () => {
    const { req, res } = mockRequestResponse("500");
    await handler(req, res);

    expect(res.statusCode).toBe(500);
  });

  test("should timeout after five tries", async () => {
    // jest.useFakeTimers();
    const { req, res } = mockRequestResponse("429");
    // const mockAddListener = jest.spyOn(handler, "setTimeout"); // spy on foo.addListener
    // mockAddListener.mockImplementation(() => {});
    await handler(req, res);

    // expect(setTimeout.mock.calls.length).toBe(2);
  }, 30000);

  // it("after 60 requests should return 429", async () => {
  //   await Array.from(Array(61).keys()).reduce((prev, cur) => {
  //     console.log(cur);

  //     // const res = await fetch(
  //     //   `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUPID}/subscribers`,
  //     //   {
  //     //     method: "post",
  //     //     body: JSON.stringify({
  //     //       email: `test@playingarts.com`,
  //     //     }),
  //     //     headers: {
  //     //       "X-MailerLite-ApiKey":
  //     //         process.env.MAILERLITE_API_KEY || "empty",
  //     //       "Content-Type": "application/json",
  //     //     },
  //     //   }
  //     // );

  //     const { req, res } = mockRequestResponse("test@playingarts.com");
  //     return prev.then(() =>
  //       (handler(req, res) as Promise<any>).then(() => {
  //         if (cur === 60) {
  //           console.log(res);
  //           expect(res.statusCode).toBe(429);
  //         }
  //         // return cur;
  //         return null;
  //       })
  //     );
  //   }, Promise.resolve(null));
  // });
});
