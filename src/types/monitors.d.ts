import type { Geostory } from './geostories';

export type Monitor = {
  author: string;
  coverage: string;
  date_created: string;
  description: string;
  geostories: Geostory[];
  id: string;
  title: string;
  entity_type: 'monitor';
  ready: boolean;
  metadata_url: string;
  notebooks_url: string;
  publications: { title: string; url: string }[];
  use_case_link: { title: string; url: string }[];
};

export type MonitorParsed = Monitor & { color: string; colorOpacity: string };
