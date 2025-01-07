import {
  createContext,
  FC,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import store from "store";

type view = {
  value?: string;
  suit?: string;
  deckSlug?: string;
};

interface Props {
  viewed: view[];
  addViewed: (props: view) => void;
  exists: (props: view) => boolean;
}

export const ViewedContext = createContext({} as Props);

export const useViewed = () => {
  return useContext(ViewedContext);
};

export const ViewedProvider: FC<HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  const [viewed, setViewed] = useState(
    (store.get("viewed") as Props["viewed"]) || []
  );

  const exists = ({ value, suit, deckSlug }: view) =>
    viewed.findIndex(
      (item) =>
        item.value === value && item.suit === suit && item.deckSlug === deckSlug
    ) !== -1;

  const addViewed = (props: view) => {
    if (exists(props)) {
      return;
    }

    setViewed((prev) => [...prev, props]);
  };

  useEffect(() => {
    store.set("viewed", viewed);
  }, [viewed]);

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
