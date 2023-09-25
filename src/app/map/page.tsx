import { FC } from 'react';

import type { Metadata } from 'next';

import MonitorsDirectoryDialog from '@/components/monitors/dialog';

export const metadata: Metadata = {
  title: 'Map - Open Earth Monitor Cyberinfrastructure',
  description: '...',
};

const MapLayout: FC = () => (
  <MonitorsDirectoryDialog isOpen={true} preventClose={true} showTriggerElement={false} />
);

export default MapLayout;
