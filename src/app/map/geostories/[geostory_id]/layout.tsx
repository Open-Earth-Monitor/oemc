import { FC, PropsWithChildren } from 'react';

import Map from '@/components/map';
import { ScrollArea } from '@/components/ui/scroll-area';

const GeostoriesLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <section className="md:[30vw] absolute bottom-3 left-3 top-3 z-40 w-[526px] overflow-hidden bg-brand-500">
        <ScrollArea className="h-full w-full p-7.5" type="auto">
          {children}
        </ScrollArea>
      </section>
      <Map />
    </>
  );
};

export default GeostoriesLayout;
