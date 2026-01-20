/**
 * SessionStorage-backed store for deck data during navigation.
 * Used to pass deck data from popup to deck page for instant display.
 * Uses sessionStorage to survive hard navigation.
 */

export interface NavigationDeckProps {
  slug: string;
  title: string;
  description?: string | null;
}

const STORAGE_KEY = "navigationDeck";

/** Store deck data for navigation (called before navigating to deck page) */
export const setNavigationDeck = (deck: NavigationDeckProps | null): void => {
  if (typeof window === "undefined") return;

  try {
    if (deck) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage unavailable (private browsing, quota exceeded)
  }
};

/** Get stored deck data (called on deck page mount) */
export const getNavigationDeck = (): NavigationDeckProps | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Storage corrupted or unavailable
  }

  return null;
};

/** Clear stored navigation deck */
export const clearNavigationDeck = (): void => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
};
