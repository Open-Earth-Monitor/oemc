'use client';

import { FC, useCallback } from 'react';

import { useSetAtom, useAtomValue } from 'jotai';

import {
  compareFunctionalityAtom,
  regionsLayerVisibilityAtom,
  nutsDataParamsAtom,
  nutsDataParamsCompareAtom,
  nutsDataResponseCompareAtom,
} from '@/app/store';

import { useNutsLayerData } from '@/hooks/layers';

import { NUTS_INITIAL_STATE } from '@/components/map/constants';
import PointHistogram from '@/components/map/stats/point-histogram';
import RegionsHistogram from '@/components/map/stats/region-histogram';

type HistogramProps = { title: string; color: string; id: string };
const Histogram: FC<HistogramProps> = ({ title, color, id }: HistogramProps) => {
  const setCompareMode = useSetAtom(compareFunctionalityAtom);
  const nutsDataParams = useAtomValue(nutsDataParamsAtom);
  const setNutsCompareDataParams = useSetAtom(nutsDataParamsCompareAtom);
  const setNutsCompareResponse = useSetAtom(nutsDataResponseCompareAtom);

  const isRegionsLayerActive = useAtomValue(regionsLayerVisibilityAtom);

  const {
    data: histogramDataRegionRaw,
    isFetching: isLoadingDataHistogram,
    isError: isErrorDataHistogram,
  } = useNutsLayerData(
    { ...nutsDataParams, key: 'regular' },
    {
      enabled: !!nutsDataParams?.NUTS_ID && !!nutsDataParams?.LAYER_ID,
    }
  );

  // const onCompareActive = useCallback(() => {
  //   setCompareMode(true);
  // }, []);

  const onCloseCompareInfo = useCallback(() => {
    setNutsCompareResponse(null);
    setNutsCompareDataParams(NUTS_INITIAL_STATE);
    setCompareMode(false);
  }, [setCompareMode, setNutsCompareDataParams, setNutsCompareResponse]);

  return (
    <div>
      {isLoadingDataHistogram && (
        <p className="text-center text-sm text-gray-500">Loading histogram data...</p>
      )}
      {!isLoadingDataHistogram && isRegionsLayerActive && histogramDataRegionRaw && (
        <RegionsHistogram color={color} title={title} onCompareClose={onCloseCompareInfo} />
      )}
      {((!isLoadingDataHistogram && !isRegionsLayerActive) ||
        (isRegionsLayerActive && !histogramDataRegionRaw)) && (
        <PointHistogram color={color} title={title} id={id} />
      )}
    </div>
  );
};

export default Histogram;
