import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);

    if (saved) {
      return JSON.parse(saved);
    }

    return initialValue;
  });

  const setStoredValue = (
    newValue: T | ((prev: T) => T)
  ) => {
    const resolvedValue =
      typeof newValue === "function"
        ? (newValue as (prev: T) => T)(value)
        : newValue;

    setValue(resolvedValue);

    localStorage.setItem(
      key,
      JSON.stringify(resolvedValue)
    );
  };

  return [value, setStoredValue] as const;
}