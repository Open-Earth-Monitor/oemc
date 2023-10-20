import { forwardRef, ButtonHTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/classnames';

const buttonVariants = cva(
  'font-inter font-bold inline-flex items-center justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-2 border-secondary-500 text-xs text-secondary-500 hover:bg-secondary-500 hover:bg-opacity-[0.1] hover:text-secondary-500 hover:border-secondary-500 hover:shadow-[-2px_2px_rgb(255, 255, 230)]',
        default_active:
          'border-2 border-secondary-500 bg-secondary-500 text-brand-500 hover:bg-opacity-[0.1] hover:text-secondary-500 hover:border-secondary-500 hover:shadow-[-2px_2px_rgb(255, 255, 230)]',
        light:
          'border-2 border-brand-500 w-full font-bold bg-transparent text-sm font-inter  hover:shadow-[2px_2px_black]',
        ghost: 'hover:bg-secondary-700',
        link: 'text-primary underline-offset-4 hover:underline',
        dark: 'w-full font-bold bg-brand-500 text-secondary-500 text-sm font-inter hover:bg-gray-900 hover:shadow-[2px_2px_black]',
      },
      size: {
        default: 'h-9 px-4 py-2',
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
