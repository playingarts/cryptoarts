import Routes from "next-routes";

export default new Routes()
  .add("home", "/", "index")
  .add("shop", "/shop")
  .add("checkout", "/checkout")
  .add("deck", "/:deckId", "[deckId]");
