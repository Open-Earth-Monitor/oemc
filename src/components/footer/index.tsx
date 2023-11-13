'use client';

import { FC } from 'react';

import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import SocialMedia from './social-media';

export const Footer: FC = () => {
  return (
    <footer className="relative flex w-full bg-brand-400 font-inter outline-none">
      <div className="m-auto flex w-full max-w-[1200px] flex-col items-center divide-y divide-secondary-900">
        <div className="flex w-full flex-1 justify-between py-7">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-secondary-700">Powered by</span>
            <Image
              alt="Open-earth-monitor"
              src="/images/OEM-logo.svg"
              width={147}
              height={40}
              className="inline-block"
            />
          </div>
          <div className="flex flex-1 cursor-pointer items-center justify-center space-x-10 text-sm font-medium text-secondary-500">
            <Dialog>
              <DialogTrigger asChild data-testid="disclaimer">
                <div>Disclaimer</div>
              </DialogTrigger>
              <DialogContent className="top-1/2 w-[665px] -translate-y-[50%] transform bg-secondary-500 p-10 text-brand-500">
                <DialogHeader className="space-y-5">
                  <DialogTitle asChild>
                    <header className="flex items-center justify-between">
                      <h2 className="text-5xl font-bold">Disclaimer</h2>
                    </header>
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div className="space-y-3" data-testid="disclaimer-content">
                      <p>
                        Funded by the European Union. Views and opinions expressed are however those
                        of the author(s) only and do not necessarily reflect those of the European
                        Union or European Commission.
                      </p>
                      <p>
                        Neither the European Union nor the granting authority can be held
                        responsible for them. The data is provided “as is”. Open-Earth-Monitor
                        Cyberinfrastructure (OEMC) project consortium and its suppliers and
                        licensors hereby disclaim all warranties of any kind, express or implied,
                        including, without limitation, the warranties of merchantability, fitness
                        for a particular purpose and non-infringement.
                      </p>
                      <p>
                        Neither OEMC project Consortium nor its suppliers and licensors, makes any
                        warranty that the Website will be error free or that access thereto will be
                        continuous or uninterrupted. You understand that you download from, or
                        otherwise obtain content or services through, the Website at your own
                        discretion and risk.
                      </p>
                      <DialogClose className="right-10 flex items-center border-none text-xs font-medium uppercase tracking-[0.96px]">
                        Close
                      </DialogClose>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://earthmonitor.org/privacy-policy/"
              title="OEMC privacy policy"
              className="align-baseline"
              aria-label="OEMC privacy policy"
              data-testid="privacy-policy-link"
            >
              Privacy Policy
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://earthmonitor.org/contact-us/"
              title="OEMC contact page"
              className="align-baseline"
              aria-label="OEMC contact page"
              data-testid="contact-link"
            >
              Contact us
            </a>
          </div>
          <SocialMedia />
        </div>
        <div className="flex w-full items-center space-x-2">
          <Image src="/images/landing/EU.svg" width={52} height={35} alt="eu" />

          <span className="block max-w-[376px] flex-1 flex-wrap space-x-2 py-7 text-[10px] leading-3">
            This project has received funding from the European Union&apos;s Horizon Europe research
            and innovation programme under{' '}
            <a
              href="https://cordis.europa.eu/project/id/101059548"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              data-test-id="OEMC-factsheet-link"
            >
              grant agreement No. 101059548.
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
