import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Box } from '../Box';
import { Portal } from '../Portal';
import * as styles from './breadcrumbFileDynamicEllipsis.css';

interface BreadcrumbDynamicEllipsisProps {
  fullPath: string;
}

export const BreadcrumbFileDynamicEllipsis = ({
  fullPath,
}: BreadcrumbDynamicEllipsisProps) => {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [pathSegments] = useState<string[]>(fullPath.split('/'));
  const [currentPathIndex, setCurrentPathIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});

  const handleEllipsisClick = () => setIsOpen(!isOpen);

  const handleHiddenItemClick = (index: number) => {
    const pathToNavigate =
      '/posts/' + omittedSegments.slice(0, index + 1).join('/');
    router.push(pathToNavigate);
  };

  const handleItemClick = (index: number) => {
    const pathToNavigate =
      '/posts/' +
      pathSegments.slice(0, omittedSegments.length + index + 1).join('/');
    router.push(pathToNavigate);
  };

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

  const omittedSegments = pathSegments.slice(0, currentPathIndex);

  return (
    <Box ref={containerRef} className={styles.root}>
      {currentPathIndex > 0 && (
        <>
          <Box
            ref={triggerRef}
            className={styles.dots}
            as="span"
            marginRight="1"
            onClick={handleEllipsisClick}
          >
            ...
          </Box>
          <>/ </>
          {isOpen && (
            <Portal selector="#portal">
              <Box style={popoverStyle}>
                <Box className={styles.ulBox({ size: 'sm' })}>
                  <Box as="ul">
                    {omittedSegments.map((item, idx) => (
                      <Box
                        key={idx}
                        className={styles.liValue({})}
                        as="li"
                        fontSize="inherit"
                        onClick={() => handleHiddenItemClick(idx)}
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
          {idx > 0 && (
            <Box as="span" fontSize="1" fontWeight={400} color="textTertiary">
              {' '}
              /{' '}
            </Box>
          )}
          <Box
            as="span"
            className={styles.ellipsisStyle({
              last: idx === pathSegments.length - currentPathIndex - 1,
            })}
            onClick={() => handleItemClick(idx)}
          >
            {segment}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
