import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Tooltip = ({
  children,
  offset = { x: 0, y: 0 },
}: {
  children: React.ReactNode;
  offset?: { x: number; y: number };
}) => {
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
    <div className='fixed top-0 pointer-events-none invisible' ref={element}>
      {children}
    </div>,
    document.body,
  );
};
