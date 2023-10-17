'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Circle } from 'lucide-react';

import { cn } from 'lib/classnames';

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'h-4 w-4 shrink-0 rounded-full border-2 border-secondary-500 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-secondary-500',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Circle className="m-auto h-2 w-2 items-center self-center fill-current align-middle text-secondary-500" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
