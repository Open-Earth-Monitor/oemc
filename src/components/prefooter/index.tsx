'use client';

import Image from 'next/image';

import { HiOutlineArrowUp } from 'react-icons/hi';

const Prefooter = () => {
  return (
    <section className="m-auto font-satoshi">
      <div className="relative m-auto flex bg-[url('/images/landing/prefooter.png')] bg-cover bg-top">
        <div className="m-auto flex w-full max-w-[1200px] space-y-12 py-32">
          <div className="pt-44">
            <div className="m-auto w-full space-y-10">
              <p className="max-w-[700px] text-8xl font-black">
                Interested in more project details?
              </p>
              <div className="flex items-end space-x-7 text-2xl font-bold">
                <a data-testid="linkOEM" href="https://earthmonitor.org/" rel="noopener noreferrer">
                  Know more about the project
                </a>
                <HiOutlineArrowUp className="h-6 w-6 rotate-45" />
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-[50%]">
            <Image src="/images/landing/screens.png" alt="screens" width={488} height={491} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prefooter;
