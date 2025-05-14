import type { Metadata, NextPage } from 'next';

import cn from '@/lib/classnames';

import WebTrafficContent from '@/components/web-traffic/content';
import WebTrafficMobileContent from '@/components/web-traffic/mobile-content';
import { useMediaQuery } from 'react-responsive';
import { mobile } from '@/lib/media-queries';

export const metadata: Metadata = {
  title: 'Map - Open Earth Monitor Cyberinfrastructure',
};

const UsageStatsPage: NextPage = () => {
  const isMobile = useMediaQuery(mobile);
  return (
    <div className="h-screen">
      <div className="flex items-center justify-between">
        <header className="divide-y-secondary-500/10 flex items-center space-x-5 divide-x text-secondary-500">
          <h2 className="text-4xl font-bold">Live Usage Statistics</h2>
          <span className="pl-4">Switch between the two different tabs</span>
        </header>
        <div className="space-y-3" data-testid="disclaimer-content"></div>
      </div>

      <WebTrafficContent />
      {isMobile && <WebTrafficMobileContent />}
    </div>
  );
};

export default UsageStatsPage;
