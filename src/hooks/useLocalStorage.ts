import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { readFromStorage, writeToStorage } from '../utils/storage';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readFromStorage<T>(key, initialValue)
  );

  useEffect(() => {
    writeToStorage<T>(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
