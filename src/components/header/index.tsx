'use client';

import { useMediaQuery } from 'react-responsive';

import cn from '@/lib/classnames';
import { mobile } from '@/lib/media-queries';

import Logo from '@/containers/explore/logo';

import MainMenuDesktop from '@/components/main-menu/desktop';
import MainMenuMobile from '@/components/main-menu/mobile';

const Header = ({ className }: { className?: string }) => {
  const isMobile = useMediaQuery(mobile);
  return (
    <div
      className={cn('pointer-events-auto z-[1000] m-auto w-full items-center', {
        [className]: className,
      })}
    >
      <div className=" flex h-full items-center justify-between">
        <Logo />
        {!isMobile && <MainMenuDesktop />}
        {isMobile && <MainMenuMobile />}
      </div>
    </div>
  );
};

export default Header;
