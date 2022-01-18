import { createStore, useStore } from "react-hookstore";
import store from "store";

if (!store.get("bag")) {
  store.set("bag", []);
}

createStore("bag", store.get("bag"));

export const useBag = () => {
  const [bag, setBag] = useStore<any[]>("bag");

  const addItem = (item: any) => {
    const newBag = [...bag, item];

    setBag(newBag);
    store.set("bag", newBag);
  };

  return { bag, addItem };
};
