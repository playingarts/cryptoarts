import Routes from "next-routes";

export default new Routes()
  .add("home", "/", "index")
  .add("shop", "/shop")
  .add("bag", "/bag")
  .add("deck", "/:deckId", "[deckId]");
