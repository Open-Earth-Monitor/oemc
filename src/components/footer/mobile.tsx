'use client';

import { FC } from 'react';

import Image from 'next/image';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import ShareSVG from '@/SVGS/share';

import PoweredBy from './powered-by';
import SocialMedia from './social-media';

export const FooterMobile: FC = () => {
  return (
    <footer className="fixed bottom-0 z-[2000] flex w-full items-center justify-between space-y-2 bg-black-500 px-4">
      <div className="flex flex-col gap-y-1 py-3">
        <a
          href="https://cordis.europa.eu/project/id/101059548"
          target="_blank"
          rel="noopener noreferrer"
          title="Funded by the European Union"
          className="flex items-center space-x-2.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
          data-test-id="OEMC-factsheet-link"
        >
          <Image
            src="/images/landing/EU.svg"
            width={53}
            height={35}
            alt="European Union Logo"
            style={{ height: 'auto' }}
          />
          <span className="text-sm font-medium text-white-50 md:whitespace-nowrap">
            Funded by the European Union
          </span>
        </a>
        <PoweredBy size="md" />
      </div>
      <Popover>
        <PopoverTrigger
          aria-label="Open social media links"
          title="Share on social media"
          className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
        >
          <ShareSVG className="h-6 w-6" aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          side="top"
          sideOffset={20}
          hideWhenDetached={true}
          className="w-fit border-none bg-white-500"
        >
          <SocialMedia theme="dark" />
        </PopoverContent>
      </Popover>
    </footer>
  );
};

export default FooterMobile;
