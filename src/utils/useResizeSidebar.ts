import { RefObject, useEffect } from 'react';

export const useResizeSidebar = (
  sidebarRef: RefObject<HTMLDivElement>,
  resizeHandleRef: RefObject<HTMLDivElement>,
  minWidth: number = 260,
  maxWidth: number = 400,
) => {
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();

      const startX = e.clientX;
      const startWidth = sidebarRef.current?.offsetWidth || 0;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!sidebarRef.current) return;

        const newWidth = startWidth + moveEvent.clientX - startX;
        sidebarRef.current.style.width = `${Math.min(
          Math.max(minWidth, newWidth),
          maxWidth,
        )}px`;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    if (resizeHandleRef.current) {
      resizeHandleRef.current.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      if (resizeHandleRef.current) {
        resizeHandleRef.current.removeEventListener(
          'mousedown',
          handleMouseDown,
        );
      }
    };
  }, [sidebarRef, resizeHandleRef, minWidth, maxWidth]);
};
