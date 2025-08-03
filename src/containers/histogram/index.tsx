'use client';

import { FC, useCallback } from 'react';

import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { XIcon } from 'lucide-react';
import PointHistogram from '@/components/map/stats/point-histogram';
import RegionsHistogram from '@/components/map/stats/region-histogram';
import {
  compareFunctionalityAtom,
  histogramVisibilityAtom,
  regionsLayerVisibilityAtom,
} from '@/app/store';

import { Button } from '@/components/ui/button';

type HistogramProps = { title: string; color: string; id: string };
const Histogram: FC<HistogramProps> = ({ title, color, id }: HistogramProps) => {
  const setHistogramVisibility = useSetAtom(histogramVisibilityAtom);
  const [compareFunctionalityInfo, setCompareFunctionalityInfo] = useAtom(compareFunctionalityAtom);
  const isRegionsLayerActive = useAtomValue(regionsLayerVisibilityAtom);

  const handleClick = () => {
    setHistogramVisibility(false);
  };

  const onCompareActive = useCallback(() => {
    setCompareFunctionalityInfo(true);
  }, []);

  const onCloseCompareInfo = useCallback(() => {
    setCompareFunctionalityInfo(false);
  }, []);

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

      {/* {isLoadingHistogram && <Loading />}
      {!isLoadingHistogram && (
        <div className="relative h-full w-full">
          <LineChart data={histogramPointData} color={color} />
        </div>
      )} */}
      {isRegionsLayerActive && <RegionsHistogram color={color} title={title} />}
      {!isRegionsLayerActive && <PointHistogram color={color} title={title} id={id} />}
    </div>
  );
};

export default Histogram;
