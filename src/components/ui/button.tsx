import { forwardRef, ButtonHTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/classnames';

const buttonVariants = cva(
  'flex w-fit items-center gap-3 rounded-full px-[14px] py-2 border border-transparent font-satoshi text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-accent-green text-black-500 hover:bg-[#18BE99] active:border active:border-white-800 ',
        gradient:
          'border-none bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] text-black-500 font-medium',
        background: 'border-none text-white-500 bg-white-500 bg-opacity-5 hover:bg-white-500/80',
        outline:
          'border border-white-800 hover:border-white-500 active:bg-accent-green active:hover:bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),theme(colors.accent-green)]',
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
