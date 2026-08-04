'use client';

import { useEffect } from 'react';

import VectorTileLayer from 'ol/layer/VectorTile';
import { applyBackground, applyStyle } from 'ol-mapbox-style';
import { useOL } from 'rlayers';

/**
 * A basemap drawn from vector tiles and a MapLibre style document, rather than
 * from pre-rendered raster tiles.
 *
 * rlayers has no component for this: `applyStyle` builds the source and the
 * style functions itself, so the layer is created imperatively and inserted at
 * the bottom of the stack, where the raster basemap would otherwise sit.
 */
const VectorBasemapLayer = ({
  styleUrl,
  attributions,
}: {
  styleUrl: string;
  attributions: string;
}) => {
  const { map } = useOL();

  useEffect(() => {
    if (!map) return;

    // `declutter` is what keeps labels and icons from overlapping each other;
    // raster basemaps get this for free because it happened at render time.
    const layer = new VectorTileLayer({ declutter: true, properties: { label: 'Basemap' } });

    // Index 0: every data layer, the labels overlay and the NUTS regions are
    // added by rlayers as siblings and must stay above the basemap.
    map.getLayers().insertAt(0, layer);

    let active = true;

    // `applyStyle` skips the style's `background` layer, which is the land
    // colour: without this the page background shows through and only water and
    // buildings appear painted.
    void applyBackground(layer, styleUrl);

    void applyStyle(layer, styleUrl)
      .then(() => {
        // The source only exists once the style has been resolved, and the
        // style document's own attribution is not the one we owe the tile host.
        if (active) layer.getSource()?.setAttributions(attributions);
      })
      .catch(() => {
        // A missing or malformed style must not take the map down with it; the
        // layer simply stays empty and the data layers keep rendering.
        if (active) map.removeLayer(layer);
      });

    return () => {
      active = false;
      map.removeLayer(layer);
    };
  }, [map, styleUrl, attributions]);

  return null;
};

export default VectorBasemapLayer;
