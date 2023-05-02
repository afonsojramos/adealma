import { cloneElement, useEffect, useMemo, useState } from 'react';

import {
  offset,
  useFloating,
  useInteractions,
  useHover,
  flip,
} from '@floating-ui/react';
import Image from 'next/image';
import { mergeRefs } from 'react-merge-refs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Tooltip = ({ slug, children }: { slug: string; children: any }) => {
  const [open, setOpen] = useState(false);
  const { width, height } = { width: 270, height: 420 };

  const { x, y, refs, strategy, context } = useFloating({
    open,
    placement: 'right',
    onOpenChange: setOpen,
    middleware: [flip({ padding: 30 }), offset(25)],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      mouseOnly: true,
      restMs: 1,
    }),
  ]);

  const ref = useMemo(
    () => mergeRefs([refs.setReference, children.ref]),
    [refs, children]
  );

  useEffect(() => {
    window.addEventListener('mousemove', ({ clientX, clientY }) => {
      refs.setReference({
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
  }, [refs]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      {open && (
        <tr
          {...getFloatingProps({
            ref: refs.setFloating,
            style: {
              position: strategy,
              top: y ?? -1000,
              left: x ?? -1000,
              width,
              height,
            },
          })}
        >
          {/* Tweak for browsers do not output an error due to the parent element being a tbody */}
          <td>
            <Image
              src={`/assets/${slug}.png`}
              alt='tooltip'
              width={width}
              height={height}
              className='z-10'
              priority
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default Tooltip;
