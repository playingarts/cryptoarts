import artists from "./artists";
import deckZero from "./deck-zero";
import deckCrypto from "./deck-crypto";
import deckFuture from "./deck-future";
import deckOne from "./deck-one";
import deckSpecial from "./deck-special";
import deckThree from "./deck-three";
import deckTwo from "./deck-two";

(async () => {
  await artists();
  await deckZero();
  await deckCrypto();
  await deckFuture();
  await deckOne();
  await deckSpecial();
  await deckThree();
  await deckTwo();

  process.exit();
})();
