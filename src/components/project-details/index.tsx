'use client';

import Image from 'next/image';
import Link from 'next/link';

import { HiOutlineArrowUp } from 'react-icons/hi';

const Prefooter = () => {
  return (
    <section className="m-auto font-satoshi">
      <div className="relative m-auto flex bg-[url('/images/landing/prefooter.png')] bg-cover bg-center py-28">
        <div className="m-auto max-w-[1200px] space-y-12">
          <p className="max-w-[900px] text-7xl font-black">Interested in more project details?</p>
          <div className="flex items-end space-x-2 text-2xl font-bold">
            <Link href="/about">Know more about the project</Link>
            <HiOutlineArrowUp className="h-6 w-6 rotate-45" />
          </div>
        </div>
        <div className="relative">
          <Image src="/images/landing/screens.png" alt="screens" width={400} height={400} />
        </div>
      </div>
    </section>
  );
};

export default Prefooter;
