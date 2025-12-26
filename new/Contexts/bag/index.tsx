import {
  FC,
  HTMLAttributes,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type PriceType<T extends boolean | undefined> = T extends true
  ? { return: number }
  : { return: string };

const bagname = "cryptoarts:bag";

export interface Props {
  getPrice: {
    <T extends boolean | undefined>(
      ...args: [{ eur: number; usd: number } | number, T]
    ): PriceType<T>["return"];
    (
      ...args: [{ eur: number; usd: number } | number, undefined?]
    ): PriceType<undefined>["return"];
  };
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

  const [bag, setBag] = useState<Record<string, number>>();

  const getBag = () => {
    const localbag: Record<string, number> | null = JSON.parse(
      localStorage.getItem(bagname) || "null"
    );

    const bag = localbag === null ? {} : localbag;
    return bag;
  };

  const getPrice: Props["getPrice"] = (price: any, raw: any) => {
    const actprice =
      typeof price !== "number" ? price[isEurope ? "eur" : "usd"] : price;

    if (raw === true) {
      return actprice;
    }

    return actprice.toLocaleString(undefined, {
      style: "currency",
      currency: isEurope ? "EUR" : "USD",
    });
  };

  const addItem = (_id: string, quantity?: number) => {
    const bag = getBag();

    const exitingQuantity = bag[_id] || 0;

    const newBag = {
      ...bag,
      [_id]: quantity || exitingQuantity + 1,
    };

    setBag(newBag);
  };

  const updateQuantity = (_id: string, newQuantity: number) => {
    const bag = getBag();

    const newBag = {
      ...bag,
      [_id]: newQuantity,
    };

    setBag(newBag);
  };

  const removeItem = (_id: string) => {
    const bag = getBag();

    const { [_id]: _, ...newBag } = bag;

    setBag(newBag);
  };

  useEffect(() => {
    if (!bag) {
      setBag(getBag());
    } else {
      localStorage.setItem(bagname, JSON.stringify(bag));
    }
  }, [bag]);

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
