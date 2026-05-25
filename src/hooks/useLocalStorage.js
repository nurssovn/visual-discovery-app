import { useState, useCallback } from 'react';
import { readStorageString, writeStorageString } from '../utils/storage';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStorageString(key, initialValue));

  const setStoredValue = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        writeStorageString(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return [value, setStoredValue];
}
