"use client";

import { createContext, useContext, useState, FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

// Future edition tabs configuration - exported for use in CardList
export const FUTURE_TABS = [
  { id: "future-i", label: "Chapter I", edition: "chapter i" },
  { id: "future-ii", label: "Chapter II", edition: "chapter ii" },
] as const;

export type FutureTabId = (typeof FUTURE_TABS)[number]["id"];

interface FutureChapterContextValue {
  activeTab: FutureTabId;
  setActiveTab: (tab: FutureTabId) => void;
  activeEdition: string | undefined;
  isFutureDeck: boolean;
}

const FutureChapterContext = createContext<FutureChapterContextValue | null>(null);

export const FutureChapterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { query } = useRouter();
  const deckId = query.deckId;

  // Check if we're on a future edition page
  const isFutureDeck = deckId === "future" || deckId === "future-ii";

  const [activeTab, setActiveTab] = useState<FutureTabId>("future-i");

  // Sync tab with URL hash on mount and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === "chapter-ii") {
        setActiveTab("future-ii");
      } else if (hash === "chapter-i") {
        setActiveTab("future-i");
      }
    };

    handleHashChange(); // Check on mount
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Get the edition filter value for the active tab
  const activeEdition = isFutureDeck
    ? FUTURE_TABS.find((t) => t.id === activeTab)?.edition
    : undefined;

  return (
    <FutureChapterContext.Provider value={{ activeTab, setActiveTab, activeEdition, isFutureDeck }}>
      {children}
    </FutureChapterContext.Provider>
  );
};

export const useFutureChapter = () => {
  const context = useContext(FutureChapterContext);
  if (!context) {
    // Return default values if used outside provider (non-Future pages)
    return {
      activeTab: "future-i" as FutureTabId,
      setActiveTab: () => {},
      activeEdition: undefined,
      isFutureDeck: false,
    };
  }
  return context;
};
