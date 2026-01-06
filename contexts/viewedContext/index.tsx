"use client";

import {
  createContext,
  FC,
  HTMLAttributes,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type ViewedCard = {
  value?: string;
  suit?: string;
  deckSlug?: string;
};

interface Props {
  viewed: ViewedCard[];
  addViewed: (props: ViewedCard) => void;
  exists: (props: ViewedCard) => boolean;
}

export const ViewedContext = createContext({} as Props);

export const useViewed = () => {
  return useContext(ViewedContext);
};

export const ViewedProvider: FC<HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  const [storedViewed, setViewed] = useLocalStorage<ViewedCard[]>("viewed", []);

  // Memoize viewed to prevent dependency array changes on every render
  const viewed = useMemo(() => storedViewed ?? [], [storedViewed]);

  const exists = useCallback(
    ({ value, suit, deckSlug }: ViewedCard) =>
      viewed.findIndex(
        (item) =>
          item.value === value &&
          item.suit === suit &&
          item.deckSlug === deckSlug
      ) !== -1,
    [viewed]
  );

  const addViewed = useCallback(
    (props: ViewedCard) => {
      const alreadyExists = viewed.findIndex(
        (item) =>
          item.value === props.value &&
          item.suit === props.suit &&
          item.deckSlug === props.deckSlug
      ) !== -1;

      if (alreadyExists) {
        return;
      }

      setViewed((prev) => [...prev, props]);
    },
    [viewed, setViewed]
  );

  return (
    <ViewedContext.Provider
      value={{
        viewed,
        addViewed,
        exists,
      }}
    >
      {children}
    </ViewedContext.Provider>
  );
};
