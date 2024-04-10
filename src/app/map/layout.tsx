import { FC, PropsWithChildren } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import MainMenu from '@/components/main-menu';

const MapLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <div className="h-[70px] w-full items-center border-b border-b-secondary-900 bg-brand-500/80">
        <div className="m-auto flex h-full max-w-[1200px] items-center justify-between">
          <div className="mx-2 flex items-center space-x-4">
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
          <MainMenu />
        </div>
      </div>
      <div className="relative h-[calc(100%-4.375rem)]">{children}</div>
    </div>
  );
};

export default MapLayout;
