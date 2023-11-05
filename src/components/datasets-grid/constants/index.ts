import type { SortingCriteria, Theme } from '../types';

export const SORTING = [
  'title',
  //  'date' TO - Do add sorting by date when API gets ready
] satisfies SortingCriteria[];
export const THEMES = [
  'Water',
  'Agriculture',
  'Biodiversity',
  'Soil',
  'Climate & Health',
  'Forest',
] satisfies Theme[];
