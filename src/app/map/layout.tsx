import Header from '@/components/header';
import { FC, PropsWithChildren } from 'react';

const MapLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="absolute left-0 top-0 h-full w-full bg-transparent">
      <Header className="max-w-lg" />
      {children}
    </div>
  );
};

export default MapLayout;
