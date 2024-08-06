'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { HiChevronDown } from 'react-icons/hi2';

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
      'group w-full min-w-[294px] rounded-sm bg-secondary-500 text-brand-500 hover:bg-secondary-600 data-[state=open]:rounded-b-none':
        true,
      [className]: !!className,
    })}
    {...props}
  >
    <div className="flex w-full items-center justify-between px-4 py-2">
      {children}
      <HiChevronDown className="h-5 w-6 fill-current font-bold group-data-[state=open]:rotate-180" />
    </div>
  </CollapsiblePrimitive.Trigger>
));

CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
