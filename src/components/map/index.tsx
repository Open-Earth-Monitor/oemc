'use client';

import React, { useMemo, FC, useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';

import MonitorMap from './monitor-map';

import { DEFAULT_VIEWPORT } from './constants';

import type { CustomMapProps } from './types';

import { Extent } from 'ol/extent';

interface ClickEvent {
  bbox?: Extent;
}

const TooltipInitialState = {
  position: null,
  coordinate: null,
  leftData: {
    id: null,
    date: null,
    title: null,
    value: null,
    range: [],
    rangeLabels: [],
    isComparable: false,
  },
  rightData: {
    id: null,
    date: null,
    title: null,
    value: null,
  },
};

const Map: FC<CustomMapProps> = ({ initialViewState = DEFAULT_VIEWPORT }) => (
  <>
    <MonitorMap />
  </>
);

export default Map;
