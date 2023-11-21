import type { SortingCriteria, Theme } from 'types/global';

export const SORTING = ['title', 'date', 'theme'] satisfies SortingCriteria[];
export const THEMES = [
  'Land Cover and Land Use',
  'Biodiversity',
  'Buildings and Settlements',
  'Water',
  'Geology and Soils',
  'Climate',
  'Population Distribution',
] satisfies Theme[];
