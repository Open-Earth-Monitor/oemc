'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/classnames';

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center py-3', className)}
    {...props}
  >
    <div className="flex w-full flex-col space-y-2">
      <p className="inter m-auto rounded-xl border border-secondary-900 p-3 text-xs font-medium text-white">
        {props.value}%
      </p>
      <div className="relative py-1.5">
        <SliderPrimitive.Track className=" h-3 w-full grow overflow-hidden rounded-full">
          <SliderPrimitive.Range className="absolute h-2.5 rounded-full bg-gradient-to-r from-secondary-500 to-secondary-800" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="-mt-0.5 block h-3.5 w-3.5 rounded-full border-2 border-white bg-primary shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </div>
    </div>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
