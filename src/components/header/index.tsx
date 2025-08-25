'use client';

import { useMediaQuery } from 'react-responsive';

import Image from 'next/image';
import Link from 'next/link';

import cn from '@/lib/classnames';
import { mobile } from '@/lib/media-queries';

import MainMenuDesktop from '@/components/main-menu/desktop';
import MainMenuMobile from '@/components/main-menu/mobile';

const Header = ({ className }: { className?: string }) => {
  const isMobile = useMediaQuery(mobile);
  return (
    <div
      className={cn('container z-[1000] m-auto h-[60px] w-full items-center sm:h-[70px]', {
        [className]: className,
      })}
    >
      <div className=" flex h-full items-center justify-between">
        <Link href="/">
          <Image
            alt="Open-earth-monitor"
            src="/images/OEM_Logo.webp"
            width={140}
            height={35}
            className="block"
            priority
          />
        </Link>
        {!isMobile && <MainMenuDesktop />}
        {isMobile && <MainMenuMobile />}
      </div>
    </div>
  );
};

export default Header;
