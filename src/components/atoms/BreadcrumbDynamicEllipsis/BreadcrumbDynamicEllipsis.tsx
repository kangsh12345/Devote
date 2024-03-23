import React, { useEffect, useRef, useState } from 'react';

import { Box } from '../Box';

interface BreadcrumbDynamicEllipsisProps {
  fullPath: string;
}

export const BreadcrumbDynamicEllipsis = ({
  fullPath,
}: BreadcrumbDynamicEllipsisProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [displayPath, setDisplayPath] = useState<string>(fullPath);
  const [pathSegments, setPathSegments] = useState<string[]>(
    fullPath.split('/'),
  );
  const [measuredWidths, setMeasuredWidths] = useState<number[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      const measureTextWidth = (text: string): number => {
        const segments = text.split('/');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          // 폰트 설정은 실제 스타일에 맞게 조정해야 합니다.
          context.font = '20px Pretendard';
          const paddingX = 12;
          const totalWidth = segments.reduce((acc, segment, idx) => {
            const segmentWidth = context.measureText(segment).width;
            // 마지막 세그먼트에는 '/'를 추가하지 않으므로 패딩을 더하지 않습니다.
            const additionalSpace = idx < segments.length - 1 ? paddingX : 0;
            return acc + segmentWidth + additionalSpace;
          }, 0);
          const slashWidth =
            context.measureText('/').width * (segments.length - 1);
          return totalWidth + slashWidth;
        }
        return 0;
      };

      const fullPathWidth = measureTextWidth(fullPath.replace(/\//g, ' / '));
      const widths: number[] = pathSegments.map((segment, index) => {
        return measureTextWidth(pathSegments.slice(index).join(' / '));
      });

      setMeasuredWidths([fullPathWidth, ...widths]);
    }
  }, [fullPath, pathSegments]);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (!entries[0]) return;

      const { contentRect } = entries[0];
      const availableWidth = contentRect.width;
      const newPathSegments = [...pathSegments];

      let adjustedPath = fullPath;
      for (let i = 0; i < measuredWidths.length; i++) {
        if (availableWidth >= measuredWidths[i]) {
          adjustedPath =
            i === 0
              ? fullPath
              : [
                  '...',
                  ...newPathSegments.slice(-(pathSegments.length - i + 1)),
                ].join(' / ');
          break;
        }
      }

      setDisplayPath(adjustedPath);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [measuredWidths, pathSegments, fullPath]);

  return (
    <Box ref={containerRef} width="full" overflow="hidden" textAlign="center">
      {displayPath.split('/').map((item, idx) => (
        <Box as="span" key={idx}>
          {item}
          {displayPath.split('/').length - 1 > idx && (
            <Box as="span" paddingX="0.5">
              /
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
