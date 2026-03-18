'use client';

import { FC } from 'react';

import Image from 'next/image';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import ShareSVG from '@/SVGS/share';

import SocialMedia from './social-media';

export const FooterMobile: FC = () => {
  return (
    <footer className="fixed bottom-0 z-[2000] flex w-full items-center justify-between space-y-2 bg-black-500 px-4">
      <div className="flex-col space-y-9">
        <a
          href="https://cordis.europa.eu/project/id/101059548"
          target="_blank"
          rel="noopener noreferrer"
          className="flex space-x-2.5 focus:outline-secondary-600"
          data-test-id="OEMC-factsheet-link"
        >
          <Image src="/images/landing/EU.svg" width={53} height={35} alt="European Union Logo" />
          <span className="py-4 text-sm font-medium text-white-50 md:whitespace-nowrap">
            Funded by the European Union
          </span>
        </a>
      </div>
      <Popover>
        <PopoverTrigger>
          <ShareSVG className="h-6 w-6" />
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
