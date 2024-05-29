import { type ReactPortal, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Tooltip: ({
  children,
  offset,
}: {
  children: React.ReactNode;
  offset?: { x: number; y: number };
}) => ReactPortal = ({ children, offset = { x: 0, y: 0 } }) => {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: { clientX: number; clientY: number }) {
      if (element.current) {
        const x = e.clientX + offset.x;
        const y = e.clientY + offset.y;
        element.current.style.transform = `translate(${x}px, ${y}px)`;
        element.current.style.visibility = 'visible';
      }
    }
    document.addEventListener('mousemove', handler);
    return () => document.removeEventListener('mousemove', handler);
  }, [offset.x, offset.y]);

  return createPortal(
    <div className='pointer-events-none invisible fixed top-0' ref={element}>
      {children}
    </div>,
    document.body,
  );
};
