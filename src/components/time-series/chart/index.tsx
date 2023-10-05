import { FC } from 'react';

import { HtmlLabel } from '@visx/annotation';
import { Group } from '@visx/group';
import { scaleLinear, scaleBand } from '@visx/scale';
import { Bar } from '@visx/shape';
import { Text } from '@visx/text';

import { cn } from '@/lib/classnames';

import { LayerParsed } from '@/types/layers';

const margin = { top: 20, bottom: 0, left: 0, right: 0 };

type ChartData = Readonly<{ year: number; fixedHeight: number }>;

const Chart: FC<{
  id: string;
  range: LayerParsed['range'];
  width: number;
  height: number;
  selectedYear: string;
  isPlaying: boolean;
  handleBarsInteractivity: (year: number) => void;
}> = ({ id, range, width, height, selectedYear, handleBarsInteractivity }) => {
  const data: ChartData[] = range?.map((r) => ({
    year: parseInt(r.value.substring(0, 4), 10),
    fixedHeight: 100,
  }));
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const filteredData = data.filter((obj, index, arr) => {
    return arr.findIndex((o) => o.year === obj.year) === index;
  });

  // helpers for accessing the data
  const x = (dt: ChartData) => dt.year;
  const y = (dt: ChartData) => dt.fixedHeight;

  // scaling the graph with the available data
  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: filteredData.map(x),
    padding: 0.4,
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...filteredData.map(y))],
  });

  const compose =
    <T, U>(scale: (value: U) => number, accessor: (filteredData: T) => U) =>
    (filteredData: T) =>
      scale(accessor(filteredData));

  const xPoint = compose(xScale, x);
  const yPoint = compose(yScale, y);

  const currentYear = filteredData.find((dt) => dt.year === Number(selectedYear));
  const currentYearPosition = currentYear ? xPoint(currentYear) : 0;
  const isStartIndex = filteredData.findIndex((dt) => dt.year === Number(selectedYear)) === 0;

  const isEndIndex =
    filteredData.findIndex((dt) => dt.year === Number(selectedYear)) === filteredData.length - 1;
  const isEdge = isStartIndex || isEndIndex;

  return (
    <svg width={'100%'} height={'100%'} className="flex" fill="red">
      <Group>
        {filteredData.map((dt, index) => {
          const barHeight = yMax - yPoint(dt);
          const isSelectedYear = dt.year === Number(selectedYear);
          const yCenter = yMax - barHeight / 2;
          const x = xPoint(dt);
          const isEdge = index === 0 || index === filteredData.length - 1;
          return (
            <g key={`bar-${dt.year}-${selectedYear}-${id}`}>
              <Bar
                x={x}
                y={yCenter}
                height={22}
                width={isEdge && !isSelectedYear ? 2 : 1}
                className={cn({
                  'w-[1px] cursor-pointer fill-current text-brand-50 hover:bg-white hover:fill-white hover:text-white':
                    true,
                  'w-[2px]': isEdge && !isSelectedYear,
                  'text-white': isEdge,
                })}
                onClick={() => {
                  const yearIndex = filteredData?.findIndex((d) => d.year === dt.year);
                  handleBarsInteractivity(yearIndex);
                }}
              />
              {isEdge && (
                <Text
                  x={x - 13}
                  y={yCenter + 40}
                  width={xScale.bandwidth() - 12}
                  fill="white"
                  fontSize={12}
                >
                  {dt.year}
                </Text>
              )}
            </g>
          );
        })}
        {
          <g>
            <Bar x={currentYearPosition} y={47} height={40} width={1} fill={'white'} />
            <HtmlLabel
              x={currentYearPosition}
              y={25}
              horizontalAnchor={!isEdge ? 'middle' : isEndIndex ? 'end' : 'start'}
              verticalAnchor="middle"
            >
              <div className="relative flex rounded-3xl border-none bg-brand-50 px-2 py-1 font-inter text-xs text-secondary-500">
                {selectedYear}
                {!isEdge && (
                  <div className="absolute -bottom-1 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-[10px] border-x-transparent border-y-brand-50 border-b-brand-50" />
                )}
              </div>
            </HtmlLabel>
          </g>
        }
      </Group>
    </svg>
  );
};

export default Chart;
