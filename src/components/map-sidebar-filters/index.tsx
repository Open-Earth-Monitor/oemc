'use client';

import { cn } from '@/lib/classnames';

import { AllCategoriesIcon } from '@/components/ui/icons/sidebar/all_category';
import { AgricultureIcon } from '@/components/ui/icons/sidebar/agriculture_category';
import { WaterIcon } from '@/components/ui/icons/sidebar/water_category';
import { ClimateAndHealthIcon } from '@/components/ui/icons/sidebar/climate_&_health_category';
import { SoilsIcon } from '@/components/ui/icons/sidebar/soils_category';
import { ForestIcon } from '@/components/ui/icons/sidebar/forest_category';
import { BiodiversityIcon } from '@/components/ui/icons/sidebar/biodiversity_category';
import SidebarItem from './sidebar-item';

export type SidebarProps = {
  type?: 'all' | 'agriculture' | 'water' | 'climate&health' | 'soils' | 'forest' | 'biodiversity';
  enabled?: boolean;
};

const SIDEBAR_BUTTONS = [
  {
    id: 'all',
    label: 'All',
    Icon: AllCategoriesIcon,
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    Icon: AgricultureIcon,
  },
  {
    id: 'water',
    label: 'Water',
    Icon: WaterIcon,
  },
  {
    id: 'climate&health',
    label: 'Climate & Health',
    Icon: ClimateAndHealthIcon,
  },
  {
    id: 'soils',
    label: 'Soils',
    Icon: SoilsIcon,
  },
  {
    id: 'forest',
    label: 'Forest',
    Icon: ForestIcon,
  },
  {
    id: 'biodiversity',
    label: 'Biodiversity',
    Icon: BiodiversityIcon,
  },
] as const;

const SidebarFilters = () => {
  return (
    <div className="fixed bottom-0 left-0 top-0 z-10 h-screen w-[88px] bg-black-500">
      <div className={cn('flex w-full flex-col items-start space-y-2 py-8 text-sm')}>
        {SIDEBAR_BUTTONS.map((button) => {
          const Icon = button.Icon;

          return (
            <SidebarItem
              key={button.id}
              Icon={Icon}
              button={{
                id: button.id,
                label: button.label,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SidebarFilters;
