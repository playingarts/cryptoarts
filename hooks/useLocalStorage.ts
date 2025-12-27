import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T | undefined, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T | undefined>(undefined);

  const getStoredValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore =
          value instanceof Function ? value(prev ?? initialValue) : value;
        return valueToStore;
      });
    },
    [initialValue]
  );

  useEffect(() => {
    if (storedValue === undefined) {
      setStoredValue(getStoredValue());
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Error saving to localStorage key "${key}":`, error);
      }
    }
  }, [storedValue, key, getStoredValue]);

  return [storedValue, setValue];
}
