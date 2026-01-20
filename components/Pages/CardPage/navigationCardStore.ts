/**
 * SessionStorage-backed store for card data during navigation.
 * Used to pass card data from popup to card page for instant display.
 * Data is cleared after first read to prevent stale data.
 * Uses sessionStorage to survive hard navigation (window.location.href).
 */

import { SSRCardProps } from "../../../pages/[deckId]/[artistSlug]";

const STORAGE_KEY = "navigationCard";

/** Store card data for navigation (called before navigating to card page) */
export const setNavigationCard = (card: SSRCardProps | null): void => {
  if (typeof window === "undefined") return;

  try {
    if (card) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(card));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage unavailable (private browsing, quota exceeded)
    // Navigation will still work, just without instant display
  }
};

/** Get stored card data (called on card page mount) */
export const getNavigationCard = (): SSRCardProps | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Storage corrupted or unavailable - fail silently, navigation still works
  }

  return null;
};

/** Clear stored navigation card (call after page has rendered with real data) */
export const clearNavigationCard = (): void => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
};
