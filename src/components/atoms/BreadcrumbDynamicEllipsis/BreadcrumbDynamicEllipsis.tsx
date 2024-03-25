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

  // TODO: 다음으로 popover에 들어갈 css + router.push기능 추가해서 ... 기능 end 시키기
  // TODO: onClickOutSide에 대해 더 공부해서 popver click outside 시 !open 시키기
  // TODO: 최적화
  const updatePopoverPosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPopoverStyle({
        position: 'fixed',
        zIndex: 1000,
        top: `${rect.bottom + 7}px`,
        left: `${rect.left}px`,
      });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updatePopoverPosition);

    if (triggerRef.current) {
      updatePopoverPosition();
    }

    return () => {
      window.removeEventListener('resize', updatePopoverPosition);
    };
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
          </Box>
          <>/ </>
          {/* TODO: parents로 빼서 hiddent 어떻게 해야할듯 */}
          {isOpen && (
            <Portal selector="#portal">
              <Box style={popoverStyle}>
                <Box className={styles.ulBox({ size: 'sm' })}>
                  <Box>{omittedSegments[0]}</Box>
                  <Box as="ul">
                    {omittedSegments.slice(1).map((item, idx) => (
                      <Box
                        key={idx}
                        className={styles.liValue({})}
                        as="li"
                        fontSize="inherit"
                      >
                        <Box className={styles.ellipsis}>{item}</Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Portal>
          )}
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
