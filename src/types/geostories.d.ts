import type { Category } from '@/constants/categories';

import type { Layer } from './layers';
import { UseCase } from './monitors-and-geostories';

export type Geostory = {
  author: string;
  date_created: string;
  description: string;
  id: string;
  layers: Layer[];
  title: string;
  theme: Category['id'];
  entity_type: 'geo_story';
  ready: boolean;
  metadata_url: string;
  notebooks_url: string;
  publications: { title: string; url: string }[];
  use_case_link: UseCase[];
  geostory_bbox: number[] | null;
  monitors: { id: string; title: string }[];
};

export type GeostoryParsed = Geostory & {
  color: string;
  colorOpacity?: string;
  colorHead?: string;
  type?: 'geostory';
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
