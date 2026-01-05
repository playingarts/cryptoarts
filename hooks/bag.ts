import { useLocalStorage } from "./useLocalStorage";

export const useBag = () => {
  const [bag, setBag] = useLocalStorage<Record<string, number>>("bag", {});

  // Use empty object while loading from localStorage
  const currentBag = bag ?? {};

  const addItem = (_id: string, quantity?: number) => {
    const existingQuantity = currentBag[_id] || 0;

    setBag({
      ...currentBag,
      [_id]: quantity ?? existingQuantity + 1,
    });
  };

  const updateQuantity = (_id: string, newQuantity: number) => {
    setBag({
      ...currentBag,
      [_id]: newQuantity,
    });
  };

  const removeItem = (_id: string) => {
    const { [_id]: _, ...newBag } = currentBag;
    setBag(newBag);
  };

  return { bag: currentBag, addItem, updateQuantity, removeItem };
};
