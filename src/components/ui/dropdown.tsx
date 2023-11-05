'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, DotFilledIcon } from '@radix-ui/react-icons';
import { HiChevronDown } from 'react-icons/hi2';

import { cn } from 'lib/classnames';

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenu = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Root>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> & {
    inset?: boolean;
  }
>(({ children, ...props }) => (
  <DropdownMenuPrimitive.Root {...props}>{children}</DropdownMenuPrimitive.Root>
));

DropdownMenu.displayName = DropdownMenuPrimitive.Root.displayName;

const DropdownMenuTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> & {
    inset?: boolean;
    children: React.ReactNode;
    className?: string;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn({
      'group h-full rounded-none border border-secondary-900 px-8 text-secondary-500 hover:bg-secondary-900':
        true,
      'pl-8': inset,
      [className]: !!className,
    })}
    {...props}
  >
    <div className="flex w-full items-center space-x-4">
      {children}
      <HiChevronDown className="h-5 w-5 group-data-[state=open]:rotate-180" />
    </div>
  </DropdownMenuPrimitive.Trigger>
));

DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'dropdown-menu-content z-50 w-full overflow-hidden border border-secondary-900 p-1 text-popover-foreground text-secondary-700 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    className?: string;
    children: React.ReactNode;
  }
>(({ className, children, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn({
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-secondary-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50':
        true,
      'pl-8': inset,
      [className]: !!className,
    })}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
    checked?: boolean;
    children: React.ReactNode;
    className?: string;
  }
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-secondary-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4 data-[state=open]:rotate-180" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & {
    children: React.ReactNode;
    className?: string;
  }
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="h-4 w-4 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
    className?: string;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn({
      'px-2 py-1.5 text-sm font-semibold': true,
      'pl-8': inset,
      [className]: !!className,
    })}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> & { className?: string }
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn({ '-mx-1 my-1 h-px bg-secondary-700': true, [className]: !!className })}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
};
