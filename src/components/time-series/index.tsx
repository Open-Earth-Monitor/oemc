import { FC } from 'react';
import { useState, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { HiPlay, HiPause } from 'react-icons/hi2';

import BarChart from './chart';
import type { TimeSeriesTypes } from './types';

const timeStepDuration = 1500;
export const TimeSeries: FC<TimeSeriesTypes> = ({ range, layerId }: TimeSeriesTypes) => {
  const [yearIndex, setYearIndex] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let interval: number | ReturnType<typeof setTimeout>;

    if (!isPlaying) {
      const yearValue = range?.[yearIndex]?.value;
      const encodedLayers = encodeURIComponent(
        JSON.stringify({
          id: layerId,
          opacity: 1,
          year: yearValue,
        })
      );

      const url = `${pathname}/?layers=[${encodedLayers}]`;
      router.replace(url);
    }

    if (isPlaying) {
      interval = setInterval(() => {
        setYearIndex((prevIndex) => (prevIndex + 1) % range.length);
        const nextYearValue = range?.[yearIndex + 1]?.value;
        const encodedLayers = encodeURIComponent(
          JSON.stringify({
            id: layerId,
            opacity: 1,
            year: nextYearValue,
          })
        );

        const url = `${pathname}/?layers=[${encodedLayers}]`;
        router.replace(url);
      }, timeStepDuration);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, yearIndex, range, layerId, pathname, router, setYearIndex]);

  const handlePlay = () => {
    setPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-between space-x-4">
      <button
        type="button"
        onClick={handlePlay}
        className="flex rounded-full border border-brand-50 border-opacity-50 p-4"
      >
        {isPlaying ? (
          <HiPause className="h-5 w-5 text-secondary-500" />
        ) : (
          <HiPlay className="h-5 w-5 text-secondary-500" />
        )}
      </button>
      <ParentSize className="flex h-full w-full">
        {({ width, height }) => (
          <BarChart
            id={layerId}
            width={width}
            height={height}
            range={range}
            selectedYear={range[yearIndex]?.label}
            isPlaying={isPlaying}
            setYearIndex={setYearIndex}
          />
        )}
      </ParentSize>
    </div>
  );
};

export default TimeSeries;
