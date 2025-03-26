import type { Theme } from '@/constants/themes';

import type { Geostory } from './geostories';

import { UseCase } from './monitors-and-geostories';

export type Monitor = {
  author: string;
  coverage: string;
  date_created: string;
  description: string;
  geostories: Geostory[];
  id: string;
  title: string;
  theme: Theme;
  entity_type: 'monitor';
  ready: boolean;
  metadata_url: string;
  notebooks_url: string;
  publications: { title: string; url: string }[];
  use_case_link: UseCase[];
  monitor_bbox: number[] | null;
  responsible_partner_name?: string;
  responsible_partner_url?: string;
};

export type MonitorParsed = Monitor & { color: string; colorOpacity?: string; colorHead?: string };

export type MonitorsPaginated = {
  monitors: Monitor[];
  next_page: string | null;
  previous_page: string | null;
  count: number;
};

export type MonitorsPaginatedParsed = {
  data: MonitorParsed[];
  next_page: string | null;
  previous_page: string | null;
  count: number;
};
