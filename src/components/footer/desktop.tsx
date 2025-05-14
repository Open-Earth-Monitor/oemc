'use client';

import { FC } from 'react';

import Image from 'next/image';

import SocialMedia from './social-media';
import MainMenuDesktop from '../main-menu/desktop';

export const FooterDesktop: FC = () => {
  return (
    <footer className="bg-primary-900 relative grid w-full grid-cols-12 items-center border-t border-t-white-50/10">
      <div className="col-span-12 flex w-full items-center justify-between">
        <div className="flex items-center divide-x divide-white-50/10">
          <div className="px-[30px]">
            <Image
              alt="Open-earth-monitor"
              src="/images/OEM_Logo.webp"
              width={140}
              height={35}
              className="inline-block"
              priority
            />
          </div>
          <a
            href="https://cordis.europa.eu/project/id/101059548"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2.5 px-[30px] focus:outline-secondary-600"
            data-test-id="OEMC-factsheet-link"
          >
            <Image src="/images/landing/EU.svg" width={53} height={35} alt="European Union Logo" />
            <span className="py-4 text-sm font-medium text-white-50 md:whitespace-nowrap">
              Funded by the European Union
            </span>
          </a>
        </div>
        <SocialMedia />
        <MainMenuDesktop />
      </div>
    </footer>
  );
};

export default FooterDesktop;
