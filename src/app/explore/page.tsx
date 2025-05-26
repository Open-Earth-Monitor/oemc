import { PropsWithChildren } from 'react';
import type { Metadata, NextPage } from 'next';

import Footer from '@/components/footer';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'Map - Open Earth Monitor Cyberinfrastructure',
};

const MapLayout: NextPage<PropsWithChildren> = ({ children }) => (
  <div className="h-screen w-screen">
    <Header />
    {children}
    <Footer />
  </div>
);

export default MapLayout;
