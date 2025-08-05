'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from 'react';

import type { DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { LuSearch } from 'react-icons/lu';

import { cn } from '@/lib/classnames';

import { Dialog, DialogContent } from '@/components/ui/dialog';

const Command = forwardRef<
  ElementRef<typeof CommandPrimitive>,
  ComponentPropsWithoutRef<typeof CommandPrimitive> & { className?: string }
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      className
    )}
    {...props}
  />
));

Command.displayName = 'Command';

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & { className?: string }
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <LuSearch className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = 'CommandInput';

const CommandList = forwardRef<
  ElementRef<typeof CommandPrimitive.List>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List> & { className?: string }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
));

CommandList.displayName = 'CommandList';

const CommandEmpty = forwardRef<
  ElementRef<typeof CommandPrimitive.Empty>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
));

CommandEmpty.displayName = 'CommandEmpty';

const CommandGroup = forwardRef<
  ElementRef<typeof CommandPrimitive.Group>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & { className?: string }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = 'CommandGroup';

const CommandSeparator = forwardRef<
  ElementRef<typeof CommandPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> & { className?: string }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
));
CommandSeparator.displayName = 'CommandSeparator';

const CommandItem = forwardRef<
  ElementRef<typeof CommandPrimitive.Item>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & { className?: string }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'aria-selected:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  />
));

CommandItem.displayName = 'CommandItem';

const CommandShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
