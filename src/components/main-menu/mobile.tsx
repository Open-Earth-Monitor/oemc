'use client';

import cn from '@/lib/classnames';

import Logo from '@/containers/explore/logo';

import MainMenuContent from '@/components/main-menu/content';
import MainMenuTrigger from '@/components/main-menu/trigger';
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@/components/ui/dialog';

const MainMenuMobile = ({ className }: { className?: string }) => (
  <div
    className={cn({
      'flex w-full items-center justify-between px-4 py-3': true,
      [className]: !!className,
    })}
  >
    <Logo className="absolute left-5 top-7 z-10 transition-[left] duration-300 ease-in-out" />
    <Dialog>
      <DialogTrigger
        className="absolute right-5 top-7 z-10 flex items-center space-x-3.5 rounded-full border-black-100 bg-black-300 px-5 py-2.5 font-satoshi transition-[left] duration-300 ease-in-out"
        data-testid="themes-filter-desktop"
      >
        <MainMenuTrigger />
      </DialogTrigger>
      <DialogContent className="left-0 h-full w-full max-w-[100vw] rounded-none bg-secondary-500 font-inter text-black-500">
        <DialogClose />
        <MainMenuContent />
      </DialogContent>
    </Dialog>
  </div>
);

export default MainMenuMobile;
