'use client';

import { forwardRef, ComponentRef, ComponentPropsWithoutRef, ReactNode } from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from 'lib/classnames';

const TooltipProvider = TooltipPrimitive.TooltipProvider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipPortal = TooltipPrimitive.Portal;

const TooltipContent = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border bg-secondary-500 p-1.5 text-sm text-brand-500 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const TooltipArrow = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Arrow>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow ref={ref} className={cn('fill-current', className)} {...props} />
));

TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

/**
 * Shared tooltip for icon-only controls. Wraps a single trigger child and
 * renders a label with a consistent hover effect (delay, portal, arrow and
 * animation) so every icon tooltip across the app looks and behaves the same.
 */
const ICON_TOOLTIP_DELAY = 100;

const IconTooltip = ({
  label,
  children,
  side = 'top',
  sideOffset = 4,
  align = 'center',
}: {
  label: ReactNode;
  children: ReactNode;
  side?: ComponentPropsWithoutRef<typeof TooltipContent>['side'];
  sideOffset?: number;
  align?: ComponentPropsWithoutRef<typeof TooltipContent>['align'];
}) => (
  <Tooltip delayDuration={ICON_TOOLTIP_DELAY}>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipPortal>
      <TooltipContent side={side} sideOffset={sideOffset} align={align}>
        <div className="text-sm">{label}</div>
        <TooltipArrow />
      </TooltipContent>
    </TooltipPortal>
  </Tooltip>
);

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
  TooltipPortal,
  IconTooltip,
};
