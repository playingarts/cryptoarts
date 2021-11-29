import artists from "./artists";
import deckZero from "./deck-zero";
import deckCrypto from "./deck-crypto";

(async () => {
  await artists();
  await deckZero();
  await deckCrypto();

  process.exit();
})();
