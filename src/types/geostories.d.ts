import type { Theme } from '@/constants/themes';

import type { Layer } from './layers';

export type Geostory = {
  author: string;
  date_created: string;
  description: string;
  id: string;
  layers: Layer[];
  title: string;
  theme: Theme;
  entity_type: 'geo_story';
  ready: boolean;
  metadata_url: string;
  notebooks_url: string;
  publications: { title: string; url: string }[];
  use_case_link: { title: string; url: string }[];
  geostory_bbox: number[] | null;
};

export type GeostoryParsed = Geostory & {
  color: string;
  colorOpacity?: string;
  colorHead?: string;
};

export type GeostoriesPaginated = {
  monitors: Geostory[];
  next_page: string | null;
  previous_page: string | null;
  total_items: number;
};

export type GeostoriesPaginatedParsed = {
  data: GeostoryParsed[];
  next_page: string | null;
  previous_page: string | null;
  total_items: number;
};
