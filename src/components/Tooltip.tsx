import { cloneElement, useEffect, useMemo, useState } from 'react';

import {
  offset,
  useFloating,
  useInteractions,
  useHover,
} from '@floating-ui/react-dom-interactions';
import Image from 'next/image';
import { mergeRefs } from 'react-merge-refs';

const Tooltip = ({ slug, children }: { slug: string; children: any }) => {
  const [open, setOpen] = useState(false);
  const { width, height } = { width: 270, height: 420 };

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    placement: 'right',
    onOpenChange: setOpen,
    middleware: [offset(25)],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      mouseOnly: true,
      restMs: 1,
    }),
  ]);

  const ref = useMemo(
    () => mergeRefs([reference, children.ref]),
    [reference, children]
  );

  useEffect(() => {
    window.addEventListener('mousemove', ({ clientX, clientY }) => {
      reference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: clientX,
            y: clientY,
            top: clientY,
            right: clientX,
            bottom: clientY,
            left: clientX,
          };
        },
      });
    });
  }, [reference]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      {open && (
        <tr
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              top: y ?? -1000,
              left: x ?? -1000,
              width,
              height,
            },
          })}
        >
          {/* This is just so that browsers do not output an error due to the parent element being a tbody */}
          <td>
            <Image
              src={`/assets/${slug}.png`}
              alt="tooltip"
              width={width}
              height={height}
              className="z-10"
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default Tooltip;
