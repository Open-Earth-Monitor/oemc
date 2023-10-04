import type { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Hub - Open Earth Monitor Cyberinfrastructure',
  description: '...',
};

const Hub: NextPage = () => {
  return (
    <div className="m-auto max-w-[1200px] py-36">
      <h1 className="max-w-[900px] font-satoshi text-7xl font-black text-secondary-500">
        Discover and Empower with Monitoring Solutions.
      </h1>
    </div>
  );
};

export default Hub;
