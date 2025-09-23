import { forwardRef, ButtonHTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/classnames';

const buttonVariants = cva(
  'border font-medium inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded-full space-x-3.5 text-black-500',
  {
    variants: {
      variant: {
        default:
          'bg-white-500 hover:bg-border-white-500 active:bg-white-500 active:text-black-500 active:border-black-500 active:bg-white-500',
        gradient:
          'border-none bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] text-black-500 font-medium',
        background: 'border-none text-white-500 bg-white-500 bg-opacity-5 hover:bg-white-500/80',
        outline:
          'border border-white-500/20 bg-transparent text-white-500 hover:bg-white-500 active:bg-white-500 hover:text-black-500 active:text-black-500 rounded-full',
      },
      size: {
        default: 'px-3.5 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
