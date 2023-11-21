import type { Geostory } from './geostories';
import { Theme } from './global';

export type Monitor = {
  author: string;
  coverage: string;
  date_created: string;
  description: string;
  geostories: Geostory[];
  id: string;
  title: string;
  entity_type: 'monitor';
  theme: Theme;
};

export type MonitorParsed = Monitor & {
  color: string;
  colorOpacity: string;
  label?: string;
  icon?: string;
  background?: string;
};
