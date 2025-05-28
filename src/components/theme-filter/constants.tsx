import { AgricultureIcon } from '@/components/ui/icons/sidebar/agriculture_category';
import { AllCategoriesIcon } from '@/components/ui/icons/sidebar/all_category';
import { BiodiversityIcon } from '@/components/ui/icons/sidebar/biodiversity_category';
import { ClimateAndHealthIcon } from '@/components/ui/icons/sidebar/climate_&_health_category';
import { ForestIcon } from '@/components/ui/icons/sidebar/forest_category';
import { SoilsIcon } from '@/components/ui/icons/sidebar/soils_category';
import { WaterIcon } from '@/components/ui/icons/sidebar/water_category';

export const THEMES = [
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
