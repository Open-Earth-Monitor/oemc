import React from 'react';

import Image from 'next/image';

import { LuX } from 'react-icons/lu';

export const RegionsBanner: React.FC = () => {
  return (
    <div className="fixed bottom-0 -mx-6 flex max-w-[420px] items-center justify-between space-x-4 rounded-t-2xl bg-white-500 px-4 py-2 text-center text-sm text-black-500">
      <Image
        src="/svgs/region.svg"
        alt="Regions banner"
        width={56}
        height={52}
        className="mx-auto -mt-4 mb-2"
      />
      <p>
        Click on the map to select a region and <span className="font-bold">analyze </span>it based
        on the active layer.
      </p>
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-black-100 font-medium">
        <LuX className="h-4 w-4 shrink-0 cursor-pointer text-black-100" />
      </div>
    </div>
  );
};

export default RegionsBanner;
