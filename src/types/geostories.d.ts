import type { Layer } from './layers';

export type Geostory = {
  author: string;
  date_created: string;
  description: string;
  id: string;
  layers: Layer[];
  title: string;
  use_case_link: string;
};
