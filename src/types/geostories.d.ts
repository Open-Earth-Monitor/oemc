import type { Layer } from './layers';

export type Geostory = {
  author: string;
  date_created: string;
  description: string;
  id: string;
  layers: Layer[];
  title: string;
  entity_type: 'geo_story';
};
