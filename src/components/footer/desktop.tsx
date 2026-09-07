'use client';

import { FC } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

import PoweredBy from './powered-by';
import SocialMedia from './social-media';

export const FooterDesktop: FC = () => {
  const pathname = usePathname();
  return (
    <footer
      className={cn({
        'z-[1000] flex w-full items-center justify-center border-t border-white-900/10 px-6 md:px-24':
          true,
        'px-5 md:px-5': pathname === '/',
      })}
    >
      {/* Under 500px the two blocks cannot share a row: they stack, sharing on
          top, then the EU logo and "Powered by" under it. */}
      <div className="mx-0 flex w-full flex-col items-start gap-y-2 py-2 min-[500px]:mx-8 min-[500px]:flex-row min-[500px]:items-center min-[500px]:justify-between min-[500px]:gap-x-6 min-[500px]:gap-y-0 min-[500px]:py-0 xl:m-auto">
        <div className="order-2 flex flex-col items-start gap-y-1 min-[500px]:order-1 min-[500px]:py-3">
          <a
            href="https://cordis.europa.eu/project/id/101059548"
            target="_blank"
            rel="noopener noreferrer"
            title="Funded by the European Union"
            className="flex items-center space-x-2.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
            data-test-id="OEMC-factsheet-link"
          >
            {/* Intrinsic size (53×35) in the props, display size in CSS: props
                that do not match the file's ratio make Next warn, because the
                `height: auto` that keeps the ratio then disagrees with them. */}
            <Image
              src="/images/landing/EU.svg"
              width={53}
              height={35}
              alt="European Union Logo"
              style={{ width: 34, height: 'auto' }}
            />
            <span className="text-xs font-medium text-white-50 md:whitespace-nowrap">
              Funded by the European Union
            </span>
          </a>
          <PoweredBy />
        </div>
        <div className="order-1 min-[500px]:order-2">
          <SocialMedia />
        </div>
      </div>
    </footer>
  );
};

export default FooterDesktop;
