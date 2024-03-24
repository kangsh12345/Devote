import React, { useEffect, useRef, useState } from 'react';

import { Box } from '../Box';
import * as styles from './breadcrumbDynamicEllipsis.css';

interface BreadcrumbDynamicEllipsisProps {
  fullPath: string;
}

// 여기서 제작
export const BreadcrumbDynamicEllipsis = ({
  fullPath,
}: BreadcrumbDynamicEllipsisProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pathSegments] = useState<string[]>(fullPath.split('/'));
  const [currentPathIndex, setCurrentPathIndex] = useState<number>(0);

  useEffect(() => {
    const measureTextWidth = (text: string): number => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        context.font = '20px Pretendard';
        return context.measureText(text).width;
      }
      return 0;
    };

    const updateDisplayPath = () => {
      // 전체 경로를 기반으로 초기 displayPath 설정
      let tempIndex = 0;
      let tempDisplayPath = pathSegments.join(' / ');
      while (
        containerRef.current &&
        measureTextWidth(tempDisplayPath) > containerRef.current.offsetWidth &&
        tempIndex < pathSegments.length - 1
      ) {
        tempIndex++;
        tempDisplayPath =
          '...' + ' / ' + pathSegments.slice(tempIndex).join(' / ');
      }
      setCurrentPathIndex(tempIndex);
    };

    window.addEventListener('resize', updateDisplayPath);
    updateDisplayPath();

    return () => {
      window.removeEventListener('resize', updateDisplayPath);
    };
  }, [pathSegments]);

  return (
    <Box ref={containerRef} className={styles.root}>
      {currentPathIndex > 0 && (
        <Box as="span" marginRight="0.5">
          ... /
        </Box>
      )}
      {pathSegments.slice(currentPathIndex).map((segment, idx) => (
        <Box as="span" key={idx}>
          {idx > 0 && <Box as="span"> / </Box>}
          <Box
            as="span"
            className={styles.ellipsisStyle({
              last: idx === pathSegments.length - currentPathIndex - 1,
            })}
          >
            {segment}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
