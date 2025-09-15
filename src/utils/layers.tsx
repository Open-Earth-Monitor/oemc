import type { Layer, LayerParsed } from '@/types/layers';

import { cleanLayer } from '@/hooks/layers';

export function normalizeLayers(layers: Layer[]): LayerParsed[] {
  return layers.flatMap((layer) => {
    const { extra_lyrs = [], ...baseLayer } = layer;
    const cleanedBase = cleanLayer(baseLayer);
    const cleanedExtras = extra_lyrs.map(cleanLayer);
    return [cleanedBase, ...cleanedExtras];
  });
}
