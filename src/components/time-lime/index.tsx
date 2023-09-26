import { FC } from 'react';
import { useState, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { HiPlay, HiPause } from 'react-icons/hi2';

import BarChart from './chart';
import type { TimeLineTypes } from './types';

export const TimeLine: FC<TimeLineTypes> = ({ range, layerId }: TimeLineTypes) => {
  const [yearIndex, setYearIndex] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let interval: number | ReturnType<typeof setTimeout>;

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
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, yearIndex, range, layerId, pathname, router]);

  const handlePlay = () => {
    setPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-between space-x-4">
      <button
        type="button"
        onClick={handlePlay}
        className="border-text-brand-50 flex rounded-full border border-opacity-50 p-4"
      >
        {isPlaying ? (
          <HiPause className="h-6 w-6 text-secondary-500" />
        ) : (
          <HiPlay className="h-6 w-6 text-secondary-500" />
        )}
      </button>
      <ParentSize className="flex h-full w-full py-6">
        {({ width, height }) => (
          <BarChart
            id={layerId}
            width={width}
            height={height}
            range={range}
            selectedYear={range[yearIndex]?.label}
          />
        )}
      </ParentSize>
    </div>
  );
};

export default TimeLine;
