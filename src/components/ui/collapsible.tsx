'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

import { cn } from 'lib/classnames';

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = forwardRef<
  ElementRef<typeof CollapsiblePrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> & {
    inset?: boolean;
    children?: React.ReactNode;
    className?: string;
  }
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn({
      'group flex w-full items-center justify-between rounded-sm  rounded-b-none px-4 py-2': true,
      [className]: !!className,
    })}
    {...props}
  >
    {children}
  </CollapsiblePrimitive.Trigger>
));

CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
