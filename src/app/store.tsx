'use client';

import { atom } from 'jotai';

import { NutsProperties } from '@/components/map/types';

export const histogramVisibilityAtom = atom<boolean>(false);
export const regionsLayerVisibilityAtom = atom<boolean>(false);
export const regionsBannerVisibilityAtom = atom<boolean>(true);

export const lonLatAtom = atom<number[]>([null, null]);
export const resolutionAtom = atom<number>(null);
export const coordinateAtom = atom<number[]>([null, null]);
export const compareFunctionalityAtom = atom<boolean>(false);

export const timeSeriesPlaybackAtom = atom<boolean>(true);

/** Tiles in flight, keyed per WMS layer instance. Written by the map layers only. */
export const mapTilesLoadingAtom = atom<Record<string, boolean>>({});

/**
 * Id of the Timeline instance that drives playback. The legend is rendered once per
 * breakpoint, so two Timelines are mounted at any time with one hidden by CSS; only the
 * owner steps, otherwise both advance the date and dates get skipped.
 *
 * No initial value on purpose: with `strict` off, `atom<string | null>(null)` resolves to
 * the read-only overload and the setter types as `never`.
 */
export const timelinePlaybackOwnerAtom = atom<string>();

/** True while any WMS layer still has tiles loading. Paces timeline playback. */
export const areMapTilesLoadingAtom = atom<boolean>((get) =>
  Object.values(get(mapTilesLoadingAtom)).some(Boolean)
);

export const nutsDataParamsAtom = atom<{ NUTS_ID: string; LAYER_ID: string }>({
  NUTS_ID: null,
  LAYER_ID: null,
});
export const nutsDataParamsCompareAtom = atom<{ NUTS_ID: string; LAYER_ID: string }>({
  NUTS_ID: null,
  LAYER_ID: null,
});
export const nutsDataResponseAtom = atom<NutsProperties>({
  NUTS_NAME: null,
  NAME_LATN: null,
  CNTR_CODE: null,
});

export const nutsDataResponseCompareAtom = atom<NutsProperties>({
  NUTS_NAME: null,
  NAME_LATN: null,
  CNTR_CODE: null,
});
