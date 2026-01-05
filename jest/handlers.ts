import { HttpResponse, bypass, http } from "msw";

export const handlers = [
  // By calling "http.get()" we're instructing MSW
  // to capture all outgoing "GET /posts" requests
  // and execute the given response resolver when they
  // happen.
  http.post(
    `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUPID}/subscribers`,
    async ({ request }) => {
      const res = await fetch(bypass(request));
      const data = await request.json();
      const { email } = data as unknown as { email: string };

      if (email === "error400@test.com") {
        return new HttpResponse(null, { status: 400 });
      } else if (email === "error500@test.com") {
        return new HttpResponse(null, { status: 500 });
      } else if (email === "error429@test.com") {
        return new HttpResponse(null, {
          status: 429,
          headers: { "X-RateLimit-Retry-After": "1" },
        });
      }
      return res;
    }
  ),
];
