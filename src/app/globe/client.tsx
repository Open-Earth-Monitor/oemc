'use client';

import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('./'), { ssr: false });

export default function GlobeClient() {
  return <Globe />;
}
