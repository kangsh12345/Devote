import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Box } from '../Box';

// 디바운싱을 적용한 useEffect
function useDebouncedEffect(
  effect: () => void,
  deps: React.DependencyList,
  delay: number,
) {
  useEffect(() => {
    const handler = setTimeout(effect, delay);
    return () => clearTimeout(handler);
  }, [...deps, delay]);
}

interface BreadcrumbDynamicEllipsisProps {
  fullPath: string;
}

export const BreadcrumbDynamicEllipsis = ({
  fullPath,
}: BreadcrumbDynamicEllipsisProps) => {
  const [visibleParts, setVisibleParts] = useState<string[]>([]);
  const [hiddenParts, setHiddenParts] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkOverflowAndUpdate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const tempVisibleParts = fullPath.split('/');
    const tempHiddenParts: string[] = [];

    const calcTextWidth = (text: string): number => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return 0;
      context.font = getComputedStyle(container).font; // 여기서 container 사용
      return context.measureText(text).width;
    };

    let totalWidth = 0;
    tempVisibleParts.forEach((part, index) => {
      totalWidth += calcTextWidth(part + (index > 0 ? ' / ' : ''));
      if (totalWidth > containerWidth && index < tempVisibleParts.length - 1) {
        tempHiddenParts.push(part);
      } else {
        setVisibleParts(tempVisibleParts.slice(index));
        setHiddenParts(tempHiddenParts);
      }
    });
  }, [fullPath]);

  useDebouncedEffect(
    () => {
      checkOverflowAndUpdate();
    },
    [fullPath, containerRef.current],
    200,
  );

  return (
    <Box width="full" ref={containerRef}>
      {hiddenParts.length > 0 && (
        <button onClick={() => console.log('Show popover with hidden parts')}>
          ...
        </button>
      )}
      {visibleParts.map((part, index) => (
        <Box key={index}>
          {index > 0 && ' / '}
          {part}
        </Box>
      ))}
    </Box>
  );
};
