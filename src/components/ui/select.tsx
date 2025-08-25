'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';
import { LuChevronDown } from 'react-icons/lu';

import { cn } from 'lib/classnames';

const SelectGroup = SelectPrimitive.Group;

const SelectValue = forwardRef<
  ElementRef<typeof SelectPrimitive.Value>,
  PropsWithChildren<ComponentPropsWithoutRef<typeof SelectPrimitive.Value>> & {
    className?: string;
  }
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Value {...props} asChild>
    <span ref={ref} className={cn('truncate text-white-500 placeholder:text-white-500', className)}>
      {children}
    </span>
  </SelectPrimitive.Value>
));

SelectValue.displayName = 'SelectValue';

const Select = ({ children, ...props }: ComponentPropsWithoutRef<typeof SelectPrimitive.Root>) => {
  return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
};

export default Select;

Select.displayName = SelectPrimitive.Root.displayName;

const SelectIcon = forwardRef<
  ElementRef<typeof SelectPrimitive.Icon>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Icon>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Icon
    ref={ref}
    className={cn(
      'group flex w-fit bg-transparent text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground hover:text-accent-green focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent-green',
      className
    )}
    {...props}
  >
    {children}
    <LuChevronDown className="h-6 w-6" />
  </SelectPrimitive.Icon>
));

SelectIcon.displayName = SelectPrimitive.Icon.displayName;

const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex h-9 w-full items-center justify-between space-x-2 whitespace-nowrap bg-transparent text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      align="center"
      sideOffset={5}
      className={cn({
        'relative z-50 min-w-min overflow-hidden rounded-xl bg-white-500 py-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2':
          true,
        'w-[var(--radix-select-trigger-width)]': position === 'popper',
        className,
      })}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full ')}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn({ 'text-sm font-semibold': true, [className]: !!className })}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Item
      {...props}
      ref={ref}
      className={cn({
        'relative m-auto flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-sm px-3.5 py-2 text-sm capitalize text-black-500 outline-none hover:bg-accent-green data-[disabled]:pointer-events-none data-[disabled]:opacity-50':
          true,
        className: !!className,
      })}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectIcon,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
