'use client';

import React, { useMemo, FC, useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';

import MonitorMap from './monitor-map';

import { DEFAULT_VIEWPORT } from './constants';

import cn from '@/lib/classnames';
import { mobile, tablet } from '@/lib/media-queries';
import { useAtom, useSetAtom } from 'jotai';
import { useDebounce } from '@/hooks/datasets';
import { useLayer, useLayerParsedSource } from '@/hooks/layers';
import { useMonitors } from '@/hooks/monitors';
import { useOpenStreetMapsLocations } from '@/hooks/openstreetmaps';
import {
  useSyncLayersSettings,
  useSyncCompareLayersSettings,
  useSyncBboxSettings,
  useSyncBasemapSettings,
} from '@/hooks/sync-query';
import PointHistogram from './stats/point-histogram';
import RegionsHistogram from './stats/region-histogram';
import {
  compareFunctionalityAtom,
  coordinateAtom,
  histogramLayerLeftVisibilityAtom,
  lonLatAtom,
  nutsDataParamsCompareAtom,
  regionsLayerVisibilityAtom,
} from '@/app/store';
import LocationSearchComponent from '@/components/location-search';
import { Size } from 'ol/size';
import Attributions from './attributions';
import { DEFAULT_VIEWPORT, InitialViewport } from './constants';
// map controls
import Controls from './controls';
import BookmarkControl from './controls/bookmark';
import ShareControl from './controls/share';
import SwipeControl from './controls/swipe';
import Legend from './legend';
import MapTooltip from './tooltip';
import type { CustomMapProps, MonitorTooltipInfo } from './types';
import { useParams } from 'next/navigation';
import CompareRegionsStatistics from './controls/compare-regions';

import type { FeatureInfoResponse } from './types';
import { getHistogramData } from '../../lib/utils';

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
