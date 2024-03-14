import { useEffect, useMemo } from 'react';
import type { FC } from 'react';

import { useInterval } from 'usehooks-ts';

import type { LayerParsed } from '@/types/layers';

import TimeSeriesLegend from '@/components/timeseries/legend';
import TimeSeriesSidebar from '@/components/timeseries/sidebar';

import { useSyncLayersSettings, useSyncTimeseriesOn } from '../../hooks/sync-query';

const TIMEOUT_STEP_DURATION = 2500;

const TimeSeries: FC<{
  layerId: LayerParsed['layer_id'];
  range: LayerParsed['range'];
  isActive: boolean;
  dataType?: 'monitor' | 'geostory';
  type?: 'legend' | 'sidebar';
  defaultActive?: boolean;
  autoPlay: boolean;
}> = ({
  range,
  isActive,
  layerId,
  dataType = 'monitor',
  type,
  defaultActive = 'false',
  autoPlay,
}) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [isPlaying, setPlaying] = useSyncTimeseriesOn();

  useEffect(() => {
    if (defaultActive && isActive && autoPlay) {
      void setPlaying(true);
    }
  }, []);

  const date = layers?.[0]?.date;

  const currentRange = useMemo(
    () => range.find((r) => r.value === date) ?? range[0],
    [date, range]
  );

  useInterval(
    () => {
      const nextRange = range[(range.indexOf(currentRange) + 1) % range.length];
      void setLayers([{ ...layers[0], date: nextRange.value }]);
    },
    isPlaying ? TIMEOUT_STEP_DURATION : null
  );

  return (
    <>
      {type === 'legend' && (
        <TimeSeriesLegend
          currentRange={currentRange}
          dataType="monitor"
          range={range}
          layerId={layerId}
          autoPlay={dataType !== 'monitor'}
          isActive={true}
        />
      )}
      {type === 'sidebar' && (
        <TimeSeriesSidebar
          currentRange={currentRange}
          dataType="monitor"
          range={range}
          layerId={layerId}
          autoPlay={dataType !== 'monitor'}
          isActive={isActive}
        />
      )}
    </>
  );
};

export default TimeSeries;
