import { AgricultureIcon } from '@/components/ui/icons/sidebar/agriculture_category';
import { AllCategoriesIcon } from '@/components/ui/icons/sidebar/all_category';
import { BiodiversityIcon } from '@/components/ui/icons/sidebar/biodiversity_category';
import { ClimateAndHealthIcon } from '@/components/ui/icons/sidebar/climate_&_health_category';
import { ForestIcon } from '@/components/ui/icons/sidebar/forest_category';
import { SoilsIcon } from '@/components/ui/icons/sidebar/soils_category';
import { WaterIcon } from '@/components/ui/icons/sidebar/water_category';

export const THEMES = [
  {
    id: 'All',
    label: 'All',
    Icon: AllCategoriesIcon,
  },
  {
    id: 'Agriculture',
    label: 'Agriculture',
    Icon: AgricultureIcon,
  },
  {
    id: 'Water',
    label: 'Water',
    Icon: WaterIcon,
  },
  {
    id: 'Climate & Health',
    label: 'Climate & Health',
    Icon: ClimateAndHealthIcon,
  },
  {
    id: 'Soil',
    label: 'Soil',
    Icon: SoilsIcon,
  },
  {
    id: 'Forest',
    label: 'Forest',
    Icon: ForestIcon,
  },
  {
    id: 'Biodiversity',
    label: 'Biodiversity',
    Icon: BiodiversityIcon,
  },
] as const;

export type ThemeID = (typeof THEMES)[number]['id'];
