import type { Monitor } from '@/types/monitors';

/**
 * Frontend additions for monitors whose API record lacks something. Applied
 * wherever a monitor is read (hooks and server metadata), so every view shows
 * the same thing. The API stays the source of truth for everything else.
 */
export type MonitorOverride = Partial<Pick<Monitor, 'external_tool'>>;

export const MONITOR_OVERRIDES: Record<string, MonitorOverride> = {
  // Planet Health Index: a composite indicator framework rather than a set of
  // map layers, so it lives in a dedicated application.
  m22: {
    external_tool: {
      title: 'Link to the framework',
      url: 'https://phi.danlooo.de/',
    },
  },
  m9: {
    external_tool: {
      title: 'Link to the framework',
      url: 'https://dailymeteo.com/explore?var=prcp&zoom=4.20&time_scale=mon&from=2017-01&to=2025-01&lon=-85.8340&lat=36.3465&basemap=satellite',
    },
  },
  m19: {
    external_tool: {
      title: 'Link to the framework',
      url: 'https://dailymeteo.com/explore?var=prcp&zoom=4.20&time_scale=mon&from=2017-01&to=2025-01&lon=-85.8340&lat=36.3465&basemap=satellite',
    },
  },
};

export function applyMonitorOverride<T extends Pick<Monitor, 'id'>>(monitor: T): T {
  const override = MONITOR_OVERRIDES[monitor?.id];
  return override ? { ...monitor, ...override } : monitor;
}
