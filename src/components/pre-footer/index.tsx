'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import { HiOutlineArrowUp } from 'react-icons/hi';

const PreFooter = () => {
  return (
    <section className="relative m-auto font-satoshi">
      <div className="relative flex h-[760px] w-full space-y-12 overflow-hidden bg-[url('/images/landing/prefooter.webp')] bg-cover bg-top bg-no-repeat">
        <div className="relative m-auto flex w-full max-w-[1200px] space-y-12 pb-32 pt-2">
          <div className="mt-44">
            <div className="m-auto w-full space-y-10 ">
              <p className="max-w-[700px] text-7xl font-black">
                Interested in more project details?
              </p>
              <motion.div
                initial="initial"
                whileHover="hover"
                className="flex w-fit items-center space-x-7 "
              >
                <div className="flex w-fit flex-col text-2xl font-bold">
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
                <HiOutlineArrowUp className="h-6 w-6 rotate-45" />
              </motion.div>
            </div>
          </div>
          <div className="absolute -right-60 top-1/2 -translate-y-[50%]">
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
    </section>
  );
};

export default PreFooter;
