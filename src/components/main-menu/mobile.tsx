'use client';

import MainMenuContent from '@/components/main-menu/content';
import MainMenuTrigger from '@/components/main-menu/trigger';
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@/components/ui/dialog';

const MainMenuMobile = () => (
  <Dialog>
    <DialogTrigger
      className="flex items-center space-x-3.5 rounded-full border-black-100 bg-black-300 px-5 py-2.5 font-satoshi"
      data-testid="themes-filter-desktop"
    >
      <MainMenuTrigger />
    </DialogTrigger>
    <DialogContent className="left-0 h-full w-full max-w-[100vw] rounded-none bg-secondary-500 font-inter text-black-500">
      <DialogClose />
      <MainMenuContent />
    </DialogContent>
  </Dialog>
);

export default MainMenuMobile;
