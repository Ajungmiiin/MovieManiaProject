'use client';

import { useEffect, useState } from 'react';

export const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<any>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};
