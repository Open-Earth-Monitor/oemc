import { Geostory, GeostoryParsed } from './geostories';
import { Monitor, MonitorParsed } from './monitors';

export type MonitorsAndGeostories = (Monitor | Geostory)[];

export type MonitorsAndGeostoriesParsed = (MonitorParsed | GeostoryParsed)[];

export type MonitorsAndGeostoriesPaginated = {
  results: (Monitor | Geostory)[];
  next_page: string | null;
  previous_page: string | null;
  total_items: number;
};

export type MonitorsAndGeostoriesPaginatedParsed = {
  data: (MonitorParsed | GeostoryParsed)[];
  next_page: string | null;
  previous_page: string | null;
  total_items: number;
};
