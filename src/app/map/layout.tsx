import { FC, PropsWithChildren } from 'react';

const MapLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="absolute left-0 top-0 h-full w-full bg-transparent">{children}</div>;
};

export default MapLayout;
