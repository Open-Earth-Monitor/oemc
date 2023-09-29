import { FC, ReactNode } from 'react';

import Map from '@/components/map';

const GeostoriesLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <section className="md:[30vw] absolute bottom-3 left-3 top-3 z-40 w-[526px] space-y-6 overflow-y-auto bg-brand-500 p-7.5">
        {children}
      </section>
      <Map />
    </>
  );
};

export default GeostoriesLayout;
