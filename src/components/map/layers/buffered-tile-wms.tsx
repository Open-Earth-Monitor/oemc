'use client';

import { FC, useCallback, useEffect, useId, useRef } from 'react';

import { useSetAtom } from 'jotai';
import TileLayer from 'ol/layer/Tile';
import { unByKey } from 'ol/Observable';
import type { TileSourceEvent } from 'ol/source/Tile';
import TileWMS from 'ol/source/TileWMS';
import type Tile from 'ol/Tile';
import TileState from 'ol/TileState';
import { RLayerTileWMSProps, useOL } from 'rlayers';

import { mapTilesLoadingAtom } from '@/app/store';

import { WMS_CRS } from '../constants';

/**
 * Upper bound for how long a date change waits for in-flight tiles. Guards against a tile
 * whose load event never arrives, which would otherwise stall playback for this layer.
 */
const PENDING_DATE_TIMEOUT = 10000;

interface BufferedTileWMSProps extends RLayerTileWMSProps {
  layerName: string;
  date: string | undefined;
  onLayerChange?: (layer: TileLayer<TileWMS> | null) => void;
}

/**
 * WMS tile layer that uses OL's native `updateParams()` for date changes.
 * Old tiles stay visible as interim tiles until new ones load — no blink.
 *
 * Date changes are throttled against the tiles still in flight: OL does not cancel pending
 * tile requests on `updateParams()`, so firing one per playback tick leaves GeoServer
 * rendering tiles nobody will use. Requests that arrive while tiles are loading are
 * coalesced into the latest date, applied once the source goes idle.
 *
 * In-flight tiles are tracked per tile, through each tile's own `change` event, rather than
 * by counting the source's `tileloadend` / `tileloaderror` events. The renderer evicts the
 * oldest tiles from its cache after a render and disposes them, which moves a still-loading
 * tile to `EMPTY` without the source emitting any end event. A counter would never return
 * to zero after that, and playback would wait on the map forever.
 */
const BufferedTileWMS: FC<BufferedTileWMSProps> = ({
  url,
  params,
  layerName,
  date,
  opacity = 1,
  zIndex = 1,
  visible = true,
  minResolution,
  maxResolution,
  minZoom,
  maxZoom,
  projection,
  attributions,
  cacheSize,
  wrapX,
  properties,
  onLayerChange,
}) => {
  const { map } = useOL();
  const layerRef = useRef<TileLayer<TileWMS> | null>(null);
  const dateRef = useRef(date);
  dateRef.current = date;
  const onLayerChangeRef = useRef(onLayerChange);
  onLayerChangeRef.current = onLayerChange;

  /** Tiles still loading, each with the function that stops listening to it. */
  const loadingTilesRef = useRef(new Map<Tile, () => void>());
  const pendingDateRef = useRef<string | undefined>(undefined);
  const hasPendingDateRef = useRef(false);
  const appliedDateRef = useRef(date);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const instanceId = useId();
  const setTilesLoading = useSetAtom(mapTilesLoadingAtom);

  /** Publish this layer's load state so timeline playback can wait for it. */
  const publishLoading = useCallback(
    (isLoading: boolean) => {
      setTilesLoading((prev) =>
        prev[instanceId] === isLoading ? prev : { ...prev, [instanceId]: isLoading }
      );
    },
    [instanceId, setTilesLoading]
  );

  useEffect(() => {
    return () =>
      setTilesLoading((prev) => {
        if (!(instanceId in prev)) return prev;
        const next = { ...prev };
        delete next[instanceId];
        return next;
      });
  }, [instanceId, setTilesLoading]);

  const clearPendingTimeout = useCallback(() => {
    if (timeoutRef.current === null) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  /** Forget every tile still tracked as loading and stop listening to it. */
  const releaseLoadingTiles = useCallback(() => {
    loadingTilesRef.current.forEach((unlisten) => unlisten());
    loadingTilesRef.current.clear();
  }, []);

  const applyDate = useCallback((nextDate: string | undefined) => {
    appliedDateRef.current = nextDate;
    layerRef.current?.getSource()?.updateParams({ DIM_DATE: nextDate });
  }, []);

  /** Apply the coalesced date, if any. Called when the source goes idle or the guard fires. */
  const flushPendingDate = useCallback(() => {
    clearPendingTimeout();
    if (!hasPendingDateRef.current) return;

    const nextDate = pendingDateRef.current;
    hasPendingDateRef.current = false;
    pendingDateRef.current = undefined;

    if (nextDate === appliedDateRef.current) return;
    applyDate(nextDate);
  }, [applyDate, clearPendingTimeout]);

  // Create layer + source once; recreate only on url/layerName change
  useEffect(() => {
    if (!map) return;

    const source = new TileWMS({
      url,
      params: {
        FORMAT: 'image/png',
        LAYERS: layerName,
        TILED: true,
        DIM_DATE: dateRef.current,
        CRS: WMS_CRS,
        ...params,
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous',
      projection,
      attributions,
      cacheSize,
      wrapX,
    });

    const layer = new TileLayer({
      source,
      opacity,
      zIndex,
      visible,
      minResolution,
      maxResolution,
      minZoom,
      maxZoom,
      properties,
    });

    // The source starts fresh: no tiles in flight, nothing coalesced from the previous one
    clearPendingTimeout();
    releaseLoadingTiles();
    hasPendingDateRef.current = false;
    pendingDateRef.current = undefined;
    appliedDateRef.current = dateRef.current;
    publishLoading(false);

    const onTileSettled = (tile: Tile) => {
      loadingTilesRef.current.get(tile)?.();
      loadingTilesRef.current.delete(tile);
      if (loadingTilesRef.current.size > 0) return;
      publishLoading(false);
      flushPendingDate();
    };

    // A tile is settled the moment its state leaves LOADING, whatever it moves to: LOADED,
    // ERROR, or EMPTY when the renderer disposes it before the request finished.
    const onTileLoadStart = ({ tile }: TileSourceEvent) => {
      if (loadingTilesRef.current.has(tile)) return;

      const onTileChange = () => {
        if (tile.getState() === TileState.LOADING) return;
        onTileSettled(tile);
      };

      tile.addEventListener('change', onTileChange);
      loadingTilesRef.current.set(tile, () => tile.removeEventListener('change', onTileChange));
      publishLoading(true);
    };

    const listenerKey = source.on('tileloadstart', onTileLoadStart);

    layerRef.current = layer;
    map.addLayer(layer);
    onLayerChangeRef.current?.(layer);

    return () => {
      unByKey(listenerKey);
      releaseLoadingTiles();
      clearPendingTimeout();
      map.removeLayer(layer);
      layerRef.current = null;
      onLayerChangeRef.current?.(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, url, layerName]);

  // Date change → updateParams keeps old tiles visible until new ones load
  useEffect(() => {
    if (date === appliedDateRef.current) return;

    // Source idle: request straight away
    if (loadingTilesRef.current.size === 0) {
      clearPendingTimeout();
      hasPendingDateRef.current = false;
      pendingDateRef.current = undefined;
      applyDate(date);
      return;
    }

    // Tiles still loading: keep only the latest date and wait for the source to go idle
    pendingDateRef.current = date;
    hasPendingDateRef.current = true;

    clearPendingTimeout();
    timeoutRef.current = setTimeout(() => {
      // A tile never left LOADING: treat the source as idle so neither the pending date
      // nor timeline playback stays blocked on it.
      releaseLoadingTiles();
      publishLoading(false);
      flushPendingDate();
    }, PENDING_DATE_TIMEOUT);
  }, [date, applyDate, clearPendingTimeout, flushPendingDate, publishLoading, releaseLoadingTiles]);

  useEffect(() => clearPendingTimeout, [clearPendingTimeout]);

  useEffect(() => {
    layerRef.current?.setOpacity(opacity);
  }, [opacity]);

  useEffect(() => {
    layerRef.current?.setVisible(visible);
  }, [visible]);

  useEffect(() => {
    layerRef.current?.setZIndex(zIndex);
  }, [zIndex]);

  return null;
};

export default BufferedTileWMS;
