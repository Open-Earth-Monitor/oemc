'use client';

import { FC } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

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
    <footer className="font-inter flex w-full space-y-7 bg-gradient-to-b from-[#09131D] to-brand-500 py-7 outline-none">
      <div className="container flex flex-col items-center">
        <div className="flex  w-full flex-1 flex-col flex-wrap justify-between gap-4 border-b border-secondary-900 pb-7 sm:flex-row">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-secondary-700">Powered by</span>
            <Image
              alt="Open-earth-monitor"
              src="/images/OEM_Logo.webp"
              width={147}
              height={40}
              className="inline-block"
              priority
            />
          </div>
          <div className="mt-10 flex flex-1 cursor-pointer items-center justify-between text-sm font-medium text-secondary-500 sm:mt-0 sm:justify-center sm:space-x-10">
            <Dialog>
              <DialogTrigger asChild data-testid="disclaimer-footer">
                <motion.div initial="initial" whileHover="hover" className="w-fit">
                  <span>Disclaimer</span>

                  <motion.div
                    className="h-0.5 w-0 bg-secondary-500"
                    variants={{
                      initial: { width: 0 },
                      hover: { width: '100%' },
                    }}
                  />
                </motion.div>
              </DialogTrigger>
              <DialogContent className="w-[665px] bg-secondary-500 text-brand-500">
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

            <motion.a
              initial="initial"
              whileHover="hover"
              target="_blank"
              rel="noopener noreferrer"
              href="https://earthmonitor.org/privacy-policy/"
              title="OEMC privacy policy"
              className="align-baseline"
              aria-label="OEMC privacy policy"
              data-testid="privacy-policy-link"
            >
              <span>Privacy Policy</span>
              <motion.div
                className="h-0.5 w-0 bg-secondary-500"
                variants={{
                  initial: { width: 0 },
                  hover: { width: '100%' },
                }}
              />
            </motion.a>
            <motion.a
              initial="initial"
              whileHover="hover"
              target="_blank"
              rel="noopener noreferrer"
              href="https://earthmonitor.org/contact-us/"
              title="OEMC contact page"
              className="align-baseline"
              aria-label="OEMC contact page"
              data-testid="contact-link"
            >
              <span>Contact us</span>{' '}
              <motion.div
                className="h-0.5 w-0 bg-secondary-500"
                variants={{
                  initial: { width: 0 },
                  hover: { width: '100%' },
                }}
              />
            </motion.a>
          </div>
          <div className="hidden sm:block">
            <SocialMedia isMobile />
          </div>
        </div>
        <div className="flex w-full items-center space-x-2 ">
          <Image src="/images/landing/EU.svg" width={53} height={35} alt="European Union Logo" />

          <span className="font-inter block flex-1 flex-wrap space-x-2 py-7 text-xs leading-tight text-secondary-700 sm:max-w-[434px]">
            This project has received funding from the European Union&apos;s Horizon Europe research
            and innovation programme under{' '}
            <a
              href="https://cordis.europa.eu/project/id/101059548"
              target="_blank"
              rel="noopener noreferrer"
              className="underline focus:outline-secondary-600"
              data-test-id="OEMC-factsheet-link"
            >
              grant agreement No. 101059548.
            </a>
          </span>
        </div>
        <div className="block w-full sm:hidden">
          <SocialMedia />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
