import artists from "./artists";
import products from "./products";
import deckZero from "./deck-zero";
import deckCrypto from "./deck-crypto";
import deckFuture1 from "./deck-future-I";
import deckFuture2 from "./deck-future-II";
import deckOne from "./deck-one";
import deckSpecial from "./deck-special";
import deckThree from "./deck-three";
import deckTwo from "./deck-two";
import deals from "./deals";

(async () => {
  await artists();
  await deckZero();
  await deckOne();
  await deckTwo();
  await deckThree();
  await deckSpecial();
  await deckFuture1();
  await deckFuture2();
  await deckCrypto();
  await products();
  await deals();

  process.exit();
})();
