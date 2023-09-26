import { FC, PropsWithChildren } from 'react';

import Map from '@/containers/map';

const MapLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="absolute bottom-0 left-0 top-[58px] w-full flex-1">
      {children}
      <Map />
    </div>
  );
};

export default MapLayout;
