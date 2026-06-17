import type { Metadata } from 'next';

import GlobeClient from '@/app/(landing)/client';

export const metadata: Metadata = {
  title: 'Hub',
  description:
    'Open Earth Monitor Cyberinfrastructure is an ecosystem of actors creating and using data tools in support of the sustainable environmental policy.',
  alternates: { canonical: '/' },
};

export default function GlobePage() {
  return <GlobeClient />;
}
