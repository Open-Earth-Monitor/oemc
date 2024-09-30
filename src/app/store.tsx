'use client';

import { atom } from 'jotai';

export const histogramLayerLeftVisibilityAtom = atom<boolean>(false);

export const lonLatAtom = atom<number[]>([null, null]);
