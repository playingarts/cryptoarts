import Routes from "next-routes";

export default new Routes()
  .add("home", "/", "index")
  .add("shop", "/shop")
  .add("bag", "/bag")
  .add("privacy", "/privacy")
  .add("contact", "/contact")
  .add("deck", "/:deckId", "[deckId]");
