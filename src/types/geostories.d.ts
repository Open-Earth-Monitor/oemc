import type { Theme } from './global';
import type { Layer } from './layers';

export type Geostory = {
  author: string;
  date_created: string;
  description: string;
  id: string;
  layers: Layer[];
  title: string;
  entity_type: 'geo_story';
  theme: Theme;
};

export type GeostoryParsed = Geostory & {
  color: string;
  colorOpacity: string;
  label: string;
  icon: string;
  background: string;
};
