import { AgricultureIcon } from '@/components/ui/icons/sidebar/agriculture_category';
import { AllCategoriesIcon } from '@/components/ui/icons/sidebar/all_category';
import { BiodiversityIcon } from '@/components/ui/icons/sidebar/biodiversity_category';
import { ClimateAndHealthIcon } from '@/components/ui/icons/sidebar/climate_&_health_category';
import { ForestIcon } from '@/components/ui/icons/sidebar/forest_category';
import { SoilsIcon } from '@/components/ui/icons/sidebar/soils_category';
import { WaterIcon } from '@/components/ui/icons/sidebar/water_category';

export const CATEGORIES = [
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

export type ThemeID = (typeof CATEGORIES)[number]['id'];

export type Category = (typeof CATEGORIES)[number];

export type ThemeColor = {
  base: string;
  light: string;
  dark: string;
};

export const CATEGORIES_COLORS: Record<ThemeID & 'Unknown', ThemeColor> = {
  Agriculture: {
    base: '#FF4F71',
    light: 'hsla(348, 85%, 58%, 0.2)',
    dark: 'hsla(8, 50%, 41%, 1)',
  },
  Water: {
    base: '#6E8DFF',
    light: 'hsla(221, 100%, 73%, 1)',
    dark: 'hsla(209, 35%, 44%, 1)',
  },
  Biodiversity: {
    base: '#FCB84B',
    light: 'hsla(37, 97%, 64%, 0.2)',
    dark: 'hsla(246, 100%, 71%, 0.2)',
  },
  Soil: {
    base: '#F1642E',
    light: 'hsla(17, 87%, 56%, 0.2)',
    dark: 'hsla(29, 59%, 26%, 1)',
  },
  'Climate & Health': {
    base: '#E44CFF',
    light: 'hsla(290, 69%, 51%, 0.2)',
    dark: 'hsla(254, 28%, 50%, 1)',
  },
  Forest: {
    base: '#19C37C',
    light: 'hsla(155, 77%, 43%, 0.2)',
    dark: 'hsla(167, 85%, 52%, 1)',
  },
  Unknown: {
    base: 'hsla(0, 0%, 79%, 1)',
    light: 'hsla(0, 0%, 79%, 0.2)',
    dark: 'hsla(0, 0%, 79%, 1)',
  },
};

export const DEFAULT_COLOR = 'hsla(0, 0%, 79%, 1)';
