'use client';

import { FC, useCallback } from 'react';

import { useSetAtom, useAtomValue } from 'jotai';
import { XIcon } from 'lucide-react';

import {
  compareFunctionalityAtom,
  histogramVisibilityAtom,
  regionsLayerVisibilityAtom,
  nutsDataParamsAtom,
  nutsDataParamsCompareAtom,
  nutsDataResponseCompareAtom,
} from '@/app/store';

import PointHistogram from '@/components/map/stats/point-histogram';
import RegionsHistogram from '@/components/map/stats/region-histogram';
import { useNutsLayerData } from '@/hooks/layers';

import { Button } from '@/components/ui/button';
import { NUTS_INITIAL_STATE } from '@/components/map/constants';

type HistogramProps = { title: string; color: string; id: string };
const Histogram: FC<HistogramProps> = ({ title, color, id }: HistogramProps) => {
  const setHistogramVisibility = useSetAtom(histogramVisibilityAtom);
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

  const handleClick = () => {
    setHistogramVisibility(false);
    setCompareMode(false);
  };

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
      <div className="flex w-full items-center justify-between border-t border-white-900 py-3">
        <div className="text-sm">Analysis</div>
        <Button
          className="flex items-center space-x-2.5"
          variant="outline"
          size="sm"
          onClick={handleClick}
        >
          <span className="text-xs">Close analysis</span>
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      {isRegionsLayerActive && histogramDataRegionRaw && (
        <RegionsHistogram color={color} title={title} onCompareClose={onCloseCompareInfo} />
      )}
      {(!isRegionsLayerActive || (isRegionsLayerActive && !histogramDataRegionRaw)) && (
        <PointHistogram color={color} title={title} id={id} />
      )}
    </div>
  );
};

export default Histogram;
