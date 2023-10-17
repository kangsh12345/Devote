'use client';

import { useEffect, useState } from 'react';

export interface DebounceProps {
  value?: string;
  delay?: number;
}

export const useDebounce = ({ value = '', delay = 150 }: DebounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
