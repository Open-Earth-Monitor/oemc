'use client';

import * as React from 'react';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/classnames';

type ScrollBarSide = 'left' | 'right';

const EDGE_FADE_PX = 48;

// Fades content into the background at the edges where it is scrolled out of view. Each fade
// grows with the distance left to scroll (up to EDGE_FADE_PX), so it eases in and out as the
// list moves instead of switching on at the first pixel. Written straight to the viewport's
// style: this runs on every scroll frame and needs no re-render.
function useEdgeFade(enabled: boolean) {
  const viewportRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const viewport = viewportRef.current;
    if (!enabled || !viewport) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      const top = Math.min(scrollTop, EDGE_FADE_PX);
      const bottom = Math.min(Math.max(scrollHeight - clientHeight - scrollTop, 0), EDGE_FADE_PX);
      viewport.style.setProperty('--fade-top', `${top}px`);
      viewport.style.setProperty('--fade-bottom', `${bottom}px`);
    };

    update();
    viewport.addEventListener('scroll', update, { passive: true });
    // The content height changes after data loads or filters apply, without any scroll event.
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    if (viewport.firstElementChild) observer.observe(viewport.firstElementChild);

    return () => {
      viewport.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [enabled]);

  return viewportRef;
}

const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    // Sidebars pass `left` so the scrollbar sits on the panel's inner edge instead of
    // overlapping the globe/map next to it.
    scrollBarSide?: ScrollBarSide;
    // Fade content into the background at edges with content hidden past them.
    edgeFade?: boolean;
  }
>(({ className, children, scrollBarSide = 'right', edgeFade = false, ...props }, ref) => {
  const viewportRef = useEdgeFade(edgeFade);

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn('relative flex grow flex-col overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        id="sidebar-scroll-viewport"
        // Radix wraps the children in a `display: table` div. A table box never shrinks below
        // its min-content, and nowrap text contributes its full width to min-content — so any
        // long label made the wrapper grow past the viewport, and `w-full` children sized
        // themselves against that overflowing width instead of the visible one. Forcing the
        // wrapper to `block` gives children a definite width again, so `truncate` and
        // flex-shrink work. Only the vertical scrollbar is rendered here, so losing the
        // table's horizontal content measurement costs us nothing.
        className={cn(
          'h-full w-full grow rounded-[inherit] [&>div]:!block',
          edgeFade &&
            '[mask-image:linear-gradient(to_bottom,transparent,black_var(--fade-top,0px),black_calc(100%-var(--fade-bottom,0px)),transparent)]'
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar side={scrollBarSide} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
    side?: ScrollBarSide;
  }
>(({ className, orientation = 'vertical', side = 'right', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-2.5 p-[1px]',
      orientation === 'vertical' && side === 'right' && 'border-l border-l-transparent',
      // Radix positions the scrollbar with an inline `right: 0`, so the override needs `!`.
      orientation === 'vertical' &&
        side === 'left' &&
        '!left-0 !right-auto border-r border-r-transparent',
      orientation === 'horizontal' && 'h-2.5 border-t border-t-transparent p-[1px]',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn('relative rounded-full bg-gray-600', orientation === 'vertical' && 'flex-1')}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
