'use client';

import {
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from 'lib/classnames';

const Dialog = ({ open, defaultOpen, onOpenChange, ...props }: DialogPrimitive.DialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(defaultOpen ?? open ?? false);
  }, [defaultOpen, open]);

  const handleOpenChanged = useCallback(
    (open: boolean) => {
      onOpenChange?.(open);
      setIsOpen(open);
    },
    [onOpenChange]
  );

  return <DialogPrimitive.Root open={isOpen} {...props} onOpenChange={handleOpenChanged} />;
};

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({ ...props }: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal {...props} />
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[1000] bg-brand-500 opacity-90 backdrop-blur-3xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    scrollArea?: boolean;
    overlay?: boolean;
  }
>(({ className, children, scrollArea = true, overlay = true, ...props }, ref) => (
  <DialogPrimitive.Portal>
    {overlay && <DialogOverlay />}
    <DialogPrimitive.Content
      ref={ref}
      className={cn({
        'fixed left-2 right-2 top-[50%] z-[1000] flex max-h-full w-full max-w-[calc(100vw-16px)] translate-x-0 translate-y-[-50%] flex-col overflow-y-scroll bg-brand-400 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:bottom-auto sm:left-[50%]  sm:max-h-[80%] sm:max-w-lg sm:translate-x-[-50%] md:max-w-2xl':
          true,
        [className]: !!className,
      })}
      {...props}
    >
      {scrollArea && <ScrollArea className="!grow px-4 py-10 sm:px-10">{children}</ScrollArea>}
      {!scrollArea && children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('leading-none tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn(className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogClose = forwardRef<
  ElementRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close> & { iconClassName?: string }
>(({ className, children, iconClassName, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    {...props}
    className={cn({
      'absolute right-4 top-6 items-center space-x-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:text-brand-500 focus:outline-secondary-600 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground':
        true,
      [className]: !!className,
    })}
  >
    {children}
    <Cross2Icon className={cn({ 'h-6 w-6': true, [iconClassName]: !!iconClassName })} />
    <span className="sr-only">Close</span>
  </DialogPrimitive.Close>
));

DialogClose.displayName = DialogPrimitive.Close.displayName;
export {
  Dialog,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
