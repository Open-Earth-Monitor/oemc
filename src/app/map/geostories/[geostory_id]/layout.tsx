import { FC, PropsWithChildren } from 'react';

import Map from '@/components/map';

const GeostoriesLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <section className="md:[30vw] absolute bottom-3 left-3 top-3 z-40 w-[526px] overflow-y-auto bg-brand-500 p-7.5">
        {children}
      </section>
      <Map />
    </>
  );
};

export default GeostoriesLayout;
