'use client';

import { FC } from 'react';

import Image from 'next/image';

import SocialMedia from './social-media';

export const FooterDesktop: FC = () => {
  return (
    <footer className="absolute bottom-0 z-50 flex w-full items-center justify-center border-t border-white-900/10">
      <div className="mx-8 flex w-full max-w-7xl items-center justify-between xl:m-auto">
        <div className="flex items-center">
          <a
            href="https://cordis.europa.eu/project/id/101059548"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2.5 focus:outline-secondary-600"
            data-test-id="OEMC-factsheet-link"
          >
            <Image
              src="/images/landing/EU.svg"
              width={34}
              height={22.75}
              alt="European Union Logo"
            />
            <span className="py-4 text-xs font-medium text-white-50 md:whitespace-nowrap">
              Funded by the European Union
            </span>
          </a>
        </div>
        <SocialMedia />
      </div>
    </footer>
  );
};

export default FooterDesktop;
