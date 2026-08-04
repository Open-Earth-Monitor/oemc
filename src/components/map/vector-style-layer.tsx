'use client';

import { useEffect } from 'react';

import VectorTileLayer from 'ol/layer/VectorTile';
import { applyBackground, applyStyle } from 'ol-mapbox-style';
import { useOL } from 'rlayers';

/**
 * A layer drawn from vector tiles and a MapLibre style document, rather than
 * from pre-rendered raster tiles. Used for both the basemap and the labels
 * overlay: the only difference is where in the stack it sits.
 *
 * rlayers has no component for this — `applyStyle` builds the source and the
 * style functions itself — so the layer is created imperatively.
 */
const VectorStyleLayer = ({
  styleUrl,
  attributions,
  zIndex,
  label = 'Basemap',
}: {
  styleUrl: string;
  attributions?: string;
  /**
   * Left undefined the layer is inserted at the bottom of the stack, under
   * every data layer. Set it to lift the layer above them, as the labels
   * overlay needs.
   */
  zIndex?: number;
  /** Shown in the layer manager; matches what the raster layers set. */
  label?: string;
}) => {
  const { map } = useOL();

  useEffect(() => {
    if (!map) return;

    // `declutter` is what stops labels and icons overlapping each other; raster
    // tiles get this for free because it happened at render time.
    const layer = new VectorTileLayer({ declutter: true, properties: { label } });

    if (zIndex === undefined) {
      // Data layers, the regions layer and the labels overlay are all added by
      // rlayers as siblings and must stay above the basemap.
      map.getLayers().insertAt(0, layer);
    } else {
      layer.setZIndex(zIndex);
      map.addLayer(layer);
    }

    let active = true;

    // `applyStyle` skips the style's `background` layer, which carries the land
    // colour. Without this the page background shows through and only water and
    // buildings look painted. Label styles have no background layer, so this is
    // a no-op for them.
    void applyBackground(layer, styleUrl);

    void applyStyle(layer, styleUrl)
      .then(() => {
        // The source only exists once the style has resolved, and the style
        // document's own attribution is not the one we owe the tile host.
        if (active && attributions) layer.getSource()?.setAttributions(attributions);
      })
      .catch(() => {
        // A missing or malformed style must not take the map down with it; the
        // layer stays empty and every other layer keeps rendering.
        if (active) map.removeLayer(layer);
      });

    return () => {
      active = false;
      map.removeLayer(layer);
    };
  }, [map, styleUrl, attributions, zIndex, label]);

  return null;
};

export default VectorStyleLayer;
