'use client';

import { FC } from 'react';

import Image from 'next/image';

import Logo from '@/containers/explore/logo';

import MainMenuDesktop from '../main-menu/desktop';

import SocialMedia from './social-media';

export const FooterMobile: FC = () => {
  return (
    <footer className="bg-primary-900 relative w-full space-y-2">
      <div className="flex-col space-y-9 px-4 py-6">
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
        <SocialMedia />
      </div>

      <div className="flex w-full items-center justify-between px-4 py-3">
        <Logo className="absolute left-5 top-7 z-10 transition-[left] duration-300 ease-in-out" />
        <MainMenuDesktop />
      </div>
    </footer>
  );
};

export default FooterMobile;
