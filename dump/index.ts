import artists from "./artists";
import products from "./products";
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
  await deckOne();
  await deckTwo();
  await deckThree();
  await deckSpecial();
  await deckFuture();
  await deckCrypto();
  await products();

  process.exit();
})();
