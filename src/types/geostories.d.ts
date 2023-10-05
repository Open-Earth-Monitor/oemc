import type { Layer } from './layers';

export type GeoStory = {
  author: string;
  date_created: string;
  description: string;
  id: string;
  layers: Layer[];
  title: string;
  use_case_link: string;
};
