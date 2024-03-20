import { useCallback } from 'react';

interface UseSidebarResizerProps {
  minSidebarWidth?: number;
  maxSidebarWidth?: number;
}

export const useSidebarResizer = ({
  minSidebarWidth = 200,
  maxSidebarWidth = 600,
}: UseSidebarResizerProps) => {
  const startResizing = useCallback(
    (
      sidebarRef: React.RefObject<HTMLDivElement>,
      e: React.MouseEvent<HTMLElement>,
    ) => {
      const startX = e.clientX;
      const startWidth = sidebarRef.current?.offsetWidth ?? 0;

      const doDrag = (dragEvent: MouseEvent) => {
        if (!sidebarRef.current) return;
        const newWidth = startWidth + dragEvent.clientX - startX;
        const clampedWidth = Math.max(
          minSidebarWidth,
          Math.min(maxSidebarWidth, newWidth),
        );
        sidebarRef.current.style.width = `${clampedWidth}px`;
      };

      const stopDrag = () => {
        window.removeEventListener('mousemove', doDrag);
        window.removeEventListener('mouseup', stopDrag);
      };

      window.addEventListener('mousemove', doDrag);
      window.addEventListener('mouseup', stopDrag);
    },
    [minSidebarWidth, maxSidebarWidth],
  );

  return startResizing;
};
