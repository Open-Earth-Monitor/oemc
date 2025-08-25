'use client';

import { useMediaQuery } from 'react-responsive';

import { mobile } from '@/lib/media-queries';

import LandingDatasetsDesktop from '@/containers/hub/datasets-grid/desktop';
import LandingDatasetsMobile from '@/containers/hub/datasets-grid/mobile';

const LandingDatasets = () => {
  const isMobile = useMediaQuery(mobile);

  return (
    <div className="relative z-10 w-full bg-black-500" id="datasetsGrid">
      {isMobile && <LandingDatasetsMobile />}
      {!isMobile && <LandingDatasetsDesktop />}
    </div>
  );
};

export default LandingDatasets;
