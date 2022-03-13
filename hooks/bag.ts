import { createStore, useStore } from "react-hookstore";
import store from "store";

if (!store.get("bag")) {
  store.set("bag", {} as Record<string, number>);
}

createStore("bag", store.get("bag"));

export const useBag = () => {
  const [bag, setBag] = useStore<Record<string, number>>("bag");

  const addItem = (_id: string, quantity?: number) => {
    const exitingQuantity = bag[_id] || 0;

    const newBag = {
      ...bag,
      [_id]: quantity || exitingQuantity + 1,
    };

    setBag(newBag);
    store.set("bag", newBag);
  };

  const updateQuantity = (_id: string, newQuantity: number) => {
    const newBag = {
      ...bag,
      [_id]: newQuantity,
    };

    setBag(newBag);
    store.set("bag", newBag);
  };

  const removeItem = (_id: string) => {
    const { [_id]: _, ...newBag } = bag;

    setBag(newBag);
    store.set("bag", newBag);
  };

  return { bag, addItem, updateQuantity, removeItem };
};
