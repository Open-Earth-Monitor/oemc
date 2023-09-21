import type { Metadata } from 'next';

import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'Hub - Open-Earth-Monitor Cyberinfrastructure',
  description: '...',
};

const Hub: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <h1 className="max-w-[50%] text-7xl text-white">
          Discover and Empower with Monitoring Solutions.
        </h1>
      </main>
    </>
  );
};

export default Hub;
