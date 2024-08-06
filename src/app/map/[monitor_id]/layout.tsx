'use client';
import type { FC, ReactNode } from 'react';

import dynamic from 'next/dynamic';

import MonitorContent from '@/components/monitors/content';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

const MonitorLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <MonitorContent>{children}</MonitorContent>
      <Map />
    </>
  );
};

export default MonitorLayout;
