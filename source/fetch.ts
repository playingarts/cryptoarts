import { fetchLogger } from "./logger";

const fetch: typeof global.fetch = (info, init) => {
  const startTime = Date.now();

  return global
    .fetch(info, init)
    .then((response) => fetchLogger(response, { ...init, startTime }));
};

export default fetch;
