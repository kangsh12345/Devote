import { RefObject, useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(
  handler: () => void,
): RefObject<T> {
  const domNodeRef = useRef<T>(null);

  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (
        domNodeRef.current &&
        !domNodeRef.current.contains(event.target as Node)
      ) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  }, [handler]);

  return domNodeRef;
}
