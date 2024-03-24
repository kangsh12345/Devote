import React, { useEffect, useRef, useState } from 'react';

import { Box } from '../Box';
import { Portal } from '../Portal';
import * as styles from './breadcrumbDynamicEllipsis.css';

interface BreadcrumbDynamicEllipsisProps {
  fullPath: string;
}

export const BreadcrumbDynamicEllipsis = ({
  fullPath,
}: BreadcrumbDynamicEllipsisProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [pathSegments] = useState<string[]>(fullPath.split('/'));
  const [currentPathIndex, setCurrentPathIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [omittedSegments, setOmittedSegments] = useState<string[]>([]);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({}); // 타입 지정

  const handleEllipsisClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPopoverStyle({
        position: 'fixed', // Popover 위치 계산에 'fixed' 사용
        zIndex: 1000, // Popover가 다른 요소들 위에 나타나도록 z-index 설정
        top: rect.bottom + 7, // '...' 요소 아래에 7px 추가
        left: rect.left, // '...' 요소 왼쪽에서 36px 오른쪽으로 이동
      });
    }
  }, [isOpen, triggerRef.current]);

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

  useEffect(() => {
    setOmittedSegments(pathSegments.slice(0, currentPathIndex));
  }, [setOmittedSegments, pathSegments, currentPathIndex]);

  return (
    <Box ref={containerRef} className={styles.root}>
      {currentPathIndex > 0 && (
        <>
          <Box
            ref={triggerRef}
            as="span"
            marginRight="1"
            onClick={handleEllipsisClick}
          >
            ...
            {/* TODO: parents로 빼서 hiddent 어떻게 해야할듯 */}
            {isOpen && (
              <Portal selector="#portal">
                <Box style={popoverStyle}>
                  <Box className={styles.ulBox({ size: 'sm' })}>
                    <Box as="ul">
                      <Box
                        className={styles.liValue({})}
                        as="li"
                        fontSize="inherit"
                      >
                        <Box>수정</Box>
                      </Box>
                      <Box
                        className={styles.liValue({})}
                        as="li"
                        fontSize="inherit"
                      >
                        <Box>삭제</Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Portal>
            )}
          </Box>
          <>/ </>
        </>
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
