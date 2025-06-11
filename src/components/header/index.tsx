import Image from 'next/image';
import Link from 'next/link';

import cn from '@/lib/classnames';

import MainMenuDesktop from '../main-menu/desktop';
import MainMenuMobile from '../main-menu/mobile';
import MainMenuTablet from '../main-menu/tablet';

const Header = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn('content-box absolute z-[1000] h-[60px] w-full items-center sm:h-[70px]', {
        [className]: className,
      })}
    >
      <div className="flex h-full items-center justify-between sm:container">
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

        <div className="flex h-full items-center sm:hidden">
          <MainMenuMobile />
        </div>
        <div className="hidden h-full sm:block lg:hidden">
          <MainMenuTablet />
        </div>
        <div className="hidden lg:block">
          <MainMenuDesktop />
        </div>
      </div>
    </div>
  );
};

export default Header;
