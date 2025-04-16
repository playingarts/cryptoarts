import { useEffect, useState } from "react";

const bagname = "bag";

export const useNewBag = () => {
  const getBag = () => {
    const localbag: Record<string, number> | null = JSON.parse(
      localStorage.getItem(bagname) || "null"
    );

    const bag = localbag === null ? {} : localbag;
    return bag;
  };

  const [bag, setBag] = useState<Record<string, number>>();

  //   useEffect(() => {
  //     const bag: Record<string, number> | null = JSON.parse(
  //       localStorage.getItem(bagname) || "null"
  //     );

  //     // check products in bag, remove product id if does not exist
  //     if (bag !== null && products) {
  //       setBag(
  //         Object.keys(bag).reduce<typeof bag>((prev, cur) => {
  //           if (products.findIndex((product) => product._id === cur) !== -1) {
  //             prev[cur] = bag[cur];
  //           }
  //           return prev;
  //         }, {})
  //       );
  //     } else {
  //       bag !== null && setBag(bag);
  //     }
  //   }, [products]);

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

  return { bag, addItem, updateQuantity, removeItem };
};
