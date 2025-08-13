'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from 'lib/classnames';

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn({
      'bg-transparent shadow focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed data-[state=checked]:border-accent-green data-[state=checked]:text-accent-green data-[state=checked]:ring-0 data-[state=checked]:ring-offset-0':
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
  PropsWithChildren<ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator>> & {
    className?: string;
  }
>(({ className, children, ...props }, ref) => (
  <CheckboxPrimitive.Indicator
    ref={ref}
    {...props}
    className={cn(
      'block h-4 w-4 rounded-full bg-white-500 text-current data-[state=checked]:bg-accent-green',
      className
    )}
  >
    {children}
  </CheckboxPrimitive.Indicator>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
CheckboxIndicator.displayName = CheckboxPrimitive.Indicator.displayName;

export { Checkbox, CheckboxIndicator };
