'use client';

import { atom } from 'jotai';

import { NutsProperties } from '@/components/map/types';

export const histogramVisibilityAtom = atom<boolean>(false);
export const regionsLayerVisibilityAtom = atom<boolean>(false);

export const lonLatAtom = atom<number[]>([null, null]);
export const resolutionAtom = atom<number>(null);
export const coordinateAtom = atom<number[]>([null, null]);
export const compareFunctionalityAtom = atom<boolean>(false);

export const timeSeriesPlaybackAtom = atom<boolean>(true);

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
