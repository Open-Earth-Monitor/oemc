'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import { HiOutlineArrowUp } from 'react-icons/hi';

const PreFooter = () => {
  return (
    <section className="relative m-auto font-satoshi">
      <div className="relative flex h-fit w-full overflow-hidden bg-[url('/images/landing/prefooter.webp')] bg-cover bg-top bg-no-repeat lg:h-[760px]">
        <div className="container relative m-auto mb-32 mt-40 flex w-full flex-col lg:flex-row">
          <div className="flex flex-1 lg:items-center">
            <div className="space-y-10 lg:w-full">
              <p className="max-w-[700px] text-5xl font-black leading-tight lg:text-7xl">
                Interested in more project details?
              </p>
              <motion.div
                initial="initial"
                whileHover="hover"
                className="flex max-w-[260px] space-x-7 sm:max-w-[66%] lg:max-w-fit"
              >
                <div className="flex flex-1 flex-col text-2xl font-bold">
                  <a
                    data-testid="linkOEM"
                    href="https://earthmonitor.org/"
                    rel="noopener noreferrer"
                  >
                    Know more about the project
                  </a>
                  <motion.div
                    className="h-0.5 w-0 bg-secondary-500"
                    variants={{
                      initial: { width: 0 },
                      hover: { width: '100%' },
                    }}
                  />
                </div>
                <HiOutlineArrowUp className="h-7 w-7 shrink-0 translate-y-1/4 rotate-45" />
              </motion.div>
            </div>
          </div>
          <div className="flex-1">
            <div className="h-full w-full translate-x-1/3 sm:-my-10 lg:my-0 lg:flex lg:translate-x-0 lg:items-center lg:pl-10">
              <Image
                src="/images/landing/screens.png"
                alt="screens"
                width={488}
                height={491}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreFooter;
