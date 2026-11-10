'use client';

import Loading from '@/app/loading';

import { ScrollArea } from '@/components/ui/scroll-area';

import GeostoryItem from './item';

const FEATURED_GEOSTORIES = [
  'g1', // Urbanization trends (global)
  'g2', // Losses and gains in primary productivity (global)
  'g3', // Future vegetation for 2040, 2060 and 2080 (global)
  'g4', // Soil-bare fraction dynamics (Europe)
  'g5', // Drought at high resolution in Europe
  'g7', // Soil tillage intensity (Europe)
  'g8', // Potential reforested map of Europe
  'g10', // Grassland and pastureland
  'g11', // Gross primary productivity
  'g12', // Flood risk index
  'g13', // High-resolution water resources management
  'g14', // Flood Susceptibility Map over Europe
  'g19', // SIF-based vegetation productivity proxy
  'g20', // Surface temperature change following afforestation
  'g23', // Climate change (Europe)
  'g31', // Air quality during COVID-19 (Europe)
  'g32', // Soil Health Data Cube (SHDC)
  'g33', // Zooming in on Air Quality
];

const GeostoriesList = ({ geostoriesList, isLoading }) => {
  const filteredGeostoriesList = geostoriesList?.filter((geostory) =>
    FEATURED_GEOSTORIES.includes(geostory.id)
  );
  return (
    <ScrollArea scrollBarSide="left" edgeFade className="h-full w-full flex-1">
      <div className="space-y-3 pl-3 pr-4">
        <p
          className="text-xs font-medium text-accent-green"
          data-testid="featured-geostories-count"
        >
          {filteredGeostoriesList?.length === 1 &&
            `${filteredGeostoriesList?.length} Feature Geostory`}
          {filteredGeostoriesList?.length > 1 &&
            `${filteredGeostoriesList?.length} Featured Geostories`}
        </p>

        <div className="flex min-h-0 flex-1 flex-col space-y-2.5">
          {isLoading && <Loading />}
          {!isLoading &&
            filteredGeostoriesList?.length > 0 &&
            filteredGeostoriesList?.map((geostory) => (
              <GeostoryItem key={geostory.id} {...geostory} />
            ))}
          {!isLoading && filteredGeostoriesList?.length === 0 && (
            <p data-testid="no-geostories-found" className="text-sm text-white-500/20">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              We couldn't find any geostories for your search. Try different keywords or remove some
              filters.
            </p>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default GeostoriesList;
