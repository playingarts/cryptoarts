import { useEffect, useState } from "react";

const STORAGE_KEY = "cryptoarts:bag";

export const useNewBag = () => {
  const getBag = () => {
    const localbag: Record<string, number> | null = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "null"
    );

    const bag = localbag === null ? {} : localbag;
    return bag;
  };

  const [bag, setBag] = useState<Record<string, number>>();

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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bag));
    }
  }, [bag]);

  return { bag, addItem, updateQuantity, removeItem };
};
