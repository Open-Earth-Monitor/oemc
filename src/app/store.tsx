'use client';

import { atom } from 'jotai';

export const histogramLayerLeftVisibilityAtom = atom<boolean>(false);
export const regionsLayerVisibility = atom<boolean>(false);

export const lonLatAtom = atom<number[]>([null, null]);
export const resolutionAtom = atom<number>(null);
export const coordinateAtom = atom<number[]>([null, null]);
