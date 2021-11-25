import artists from "./artists";
import deckZero from "./deck-zero";

(async () => {
  await artists();
  await deckZero();

  process.exit();
})();
