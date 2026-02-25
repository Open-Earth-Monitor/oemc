import type { Metadata } from 'next';

import GlobeClient from './client';

export const metadata: Metadata = {
  title: 'Hub - Open Earth Monitor Cyberinfrastructure',
  description:
    'Open Earth Monitor Cyberinfrastructure is an ecosystem of actors creating and using data tools in support of the sustainable environmental policy.',
};

export default function GlobePage() {
  return <GlobeClient />;
}
