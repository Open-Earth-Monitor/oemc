import Image from 'next/image';
import Link from 'next/link';

import MainMenuDesktop from '../main-menu/desktop';
import MainMenuMobile from '../main-menu/mobile';
import MainMenuTablet from '../main-menu/tablet';
import WebTraffic from '@/components/web-traffic';

const Header = () => {
  return (
    <div className="absolute z-[1000] h-[70px] w-screen items-center border-b border-b-secondary-900 bg-[#09131DCC]">
      <div className="m-auto flex h-full items-center justify-between px-3 sm:container">
        <div className="mr-2 flex items-center space-x-4">
          <Link href="/">
            <Image
              alt="Open-earth-monitor"
              src="/images/OEM-logo.svg"
              width={147}
              height={40}
              className="block"
              priority
            />
          </Link>
          <div
            data-testid="alpha-site"
            className="rounded-sm border border-alert px-[6px] py-1 font-inter text-xs text-alert"
          >
            Alpha version
          </div>
        </div>
        <div className="sm:hidden">
          <MainMenuMobile />
        </div>
        <div className="hidden h-full sm:block lg:hidden">
          <MainMenuTablet />
        </div>
        <div className="hidden h-full lg:block">
          <MainMenuDesktop />
        </div>
        <div className="hidden h-full lg:block">
          <WebTraffic />
        </div>
      </div>
    </div>
  );
};

export default Header;
