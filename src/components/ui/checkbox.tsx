'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from 'lib/classnames';

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn({
      'h-4 w-4 shrink-0 bg-transparent shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-secondary-500':
        true,
      [className]: !!className,
    })}
    {...props}
  >
    {children}
  </CheckboxPrimitive.Root>
));

const CheckboxIndicator = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Indicator>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator>
>(({ className, children, ...props }, ref) => (
  <CheckboxPrimitive.Indicator
    ref={ref}
    {...props}
    className={cn({
      'flex items-center justify-center border-none p-0 text-current': true,
      [className]: !!className,
    })}
  >
    {children}
  </CheckboxPrimitive.Indicator>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
CheckboxIndicator.displayName = CheckboxPrimitive.Indicator.displayName;

export { Checkbox, CheckboxIndicator };
