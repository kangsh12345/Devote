import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  selector: string;
}

export const Portal = ({
  selector,
  children,
}: PropsWithChildren<PortalProps>) => {
  const element =
    typeof window !== 'undefined' && document.querySelector(selector);
  return element && children ? createPortal(<>{children}</>, element) : null;
};
