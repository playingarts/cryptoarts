// Card value order (2-10, jack, queen, king, ace, then special cards)
const VALUE_ORDER: Record<string, number> = {
  "2": 0, "3": 1, "4": 2, "5": 3, "6": 4, "7": 5, "8": 6, "9": 7, "10": 8,
  "jack": 9, "queen": 10, "king": 11, "ace": 12,
  "joker": 13, "backside": 14,
};

// Suit order: spades, hearts, clubs, diamonds
const SUIT_ORDER: Record<string, number> = {
  "spades": 0, "hearts": 1, "clubs": 2, "diamonds": 3,
};

// Special card sort key: joker-black, backside*, joker-red, joker-blue
const getSpecialCardOrder = (card: Pick<GQL.Card, "value" | "suit">): number => {
  if (card.value === "joker" && card.suit === "black") return 0;
  if (card.value === "backside") return 1;
  if (card.value === "joker" && card.suit === "red") return 2;
  if (card.value === "joker" && card.suit === "blue") return 3;
  return 99;
};

/**
 * Sort cards by value then suit.
 * Order: 2's first (spades, hearts, clubs, diamonds), then 3's, etc.
 * Ends with: jack, queen, king, ace, joker-black, backsides, joker-red, joker-blue
 */
export const sortCards = <T extends Pick<GQL.Card, "value" | "suit">>(cards: T[]): T[] => {
  return [...cards].sort((a, b) => {
    const valueA = VALUE_ORDER[a.value] ?? 99;
    const valueB = VALUE_ORDER[b.value] ?? 99;
    if (valueA !== valueB) return valueA - valueB;

    // Special handling for jokers and backsides
    if (a.value === "joker" || a.value === "backside") {
      return getSpecialCardOrder(a) - getSpecialCardOrder(b);
    }

    const suitA = SUIT_ORDER[a.suit] ?? 99;
    const suitB = SUIT_ORDER[b.suit] ?? 99;
    return suitA - suitB;
  });
};
