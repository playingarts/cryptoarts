import {
  FC,
  HTMLAttributes,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const STORAGE_KEY = "cryptoarts:bag";

export interface Props {
  getPrice: (
    price: { eur: number; usd: number } | number,
    raw?: boolean
  ) => string | number;
  getBag: () => Record<string, number>;
  addItem: (_id: string, quantity?: number) => void;
  updateQuantity: (_id: string, newQuantity: number) => void;
  removeItem: (_id: string) => void;
  bag: Record<string, number> | undefined;
}

export const BagContext = createContext({} as Props);

export const useBag = () => {
  return useContext(BagContext);
};

export const IsEuropeProvider: FC<HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  const [isEurope, setIsEurope] = useState<boolean>(false);
  const [bag, setBag] = useLocalStorage<Record<string, number>>(STORAGE_KEY, {});

  const getBag = useCallback(() => bag ?? {}, [bag]);

  const getPrice = useCallback(
    (price: { eur: number; usd: number } | number, raw?: boolean): string | number => {
      const actprice =
        typeof price !== "number" ? price[isEurope ? "eur" : "usd"] : price;

      if (raw === true) {
        return actprice;
      }

      return actprice.toLocaleString(undefined, {
        style: "currency",
        currency: isEurope ? "EUR" : "USD",
      });
    },
    [isEurope]
  );

  const addItem = useCallback(
    (_id: string, quantity?: number) => {
      setBag((prev) => {
        const existingQuantity = prev[_id] || 0;
        return {
          ...prev,
          [_id]: quantity ?? existingQuantity + 1,
        };
      });
    },
    [setBag]
  );

  const updateQuantity = useCallback(
    (_id: string, newQuantity: number) => {
      setBag((prev) => ({
        ...prev,
        [_id]: newQuantity,
      }));
    },
    [setBag]
  );

  const removeItem = useCallback(
    (_id: string) => {
      setBag((prev) => {
        const { [_id]: _, ...rest } = prev;
        return rest;
      });
    },
    [setBag]
  );

  useEffect(() => {
    setIsEurope(
      Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Europe/")
    );
  }, []);

  return (
    <BagContext.Provider
      value={{ bag, getPrice, addItem, getBag, removeItem, updateQuantity }}
    >
      {children}
    </BagContext.Provider>
  );
};
