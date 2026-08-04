import { useMemo } from 'react';

import { BASEMAPS, LABELS } from '@/components/map/controls/basemaps/constants';
import type { LabelProps } from '@/components/map/controls/basemaps/constants';

import { useSyncBasemapLabelsSettings, useSyncBasemapSettings } from './sync-query';

/** The basemap named in the URL, falling back to the first when it is unknown. */
export function useSelectedBasemap() {
  const [basemap] = useSyncBasemapSettings();

  return useMemo(() => BASEMAPS.find(({ id }) => id === basemap) ?? BASEMAPS[0], [basemap]);
}

/**
 * The labels overlay to draw, and the setter for choosing one explicitly.
 *
 * Until the user picks a variant themselves, this follows the basemap: dark
 * labels over imagery, light ones over the gray basemap. Picking a variant
 * writes it to the URL and pins it, so switching basemap afterwards keeps the
 * user's choice rather than overriding it.
 */
export function useBasemapLabels() {
  const basemap = useSelectedBasemap();
  const [chosenLabels, setLabels] = useSyncBasemapLabelsSettings();

  const activeLabels = chosenLabels ?? basemap.defaultLabels;

  const style = useMemo(() => LABELS.find(({ id }) => id === activeLabels) ?? null, [activeLabels]);

  return {
    /** The variant in effect, whether chosen or inherited from the basemap. */
    activeLabels,
    /** Its entry in `LABELS`, i.e. the style document and attribution to render. */
    style,
    setLabels: setLabels as (value: LabelProps['id']) => void,
  };
}
