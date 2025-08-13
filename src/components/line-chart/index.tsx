import { useMemo } from 'react';

import { Label } from '@visx/annotation';
import { ParentSize } from '@visx/responsive';
import { Line } from '@visx/shape';
import { useTooltipInPortal } from '@visx/tooltip';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  buildChartTheme,
} from '@visx/xychart';
import { format } from 'd3-format';

const numberFormat = format(',.2f');

function formatDate(value: unknown): string {
  const date = new Date(value as string);
  if (!isNaN(date.getTime())) {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date); // e.g., "01 May 2019"
  }

  return String(value);
}

export const LineChart = ({
  data,
  dataCompare,
  color,
}: {
  data: { title?: string; data: { x: string | number | Date; y: number; unit: string }[] };
  dataCompare?: { title?: string; data: { x: string | number | Date; y: number; unit: string }[] };
  color: string;
}) => {
  const { TooltipInPortal, containerRef } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });
  const theme = buildChartTheme({
    backgroundColor: 'transparent',
    gridColor: '#9CA3AF',
    gridColorDark: '#9CA3AF',
    colors: [color, '#ffffe6'],
    tickLength: 5,
  });
  const xSample = data?.data?.[0]?.x;
  const isDate = !isNaN(Date.parse(String(xSample)));
  const isNumber = typeof xSample === 'number';

  const xScaleType = isDate ? 'time' : isNumber ? 'linear' : 'point';

  const accessors = {
    xAccessor: isDate ? (d: any) => new Date(d.x) : (d: any) => d.x,
    yAccessor: (d: any) => d.y,
  };

  const allY = useMemo(
    () => [
      ...data.data.map(accessors.yAccessor),
      ...(dataCompare?.data ?? []).map(accessors.yAccessor),
    ],
    [data, dataCompare, accessors.yAccessor]
  );
  const yMin = useMemo(() => Math.min(...allY), [allY]);
  const yMax = useMemo(() => Math.max(...allY), [allY]);
  const unit = data.data[0]?.unit || '';
  return (
    <div ref={containerRef} className="relative h-72 w-full text-white-500">
      <ParentSize>
        {({ width, height }) => (
          <XYChart
            theme={theme}
            width={width}
            height={height}
            xScale={{ type: xScaleType }}
            yScale={{ type: 'linear', domain: [yMin, yMax] }}
            margin={{ top: 30, right: 20, bottom: 60, left: 60 }}
          >
            <Label
              x={90}
              y={30}
              title={unit}
              titleFontSize={12}
              fontColor="#dfdfdf"
              backgroundFill="transparent"
            />
            <AnimatedAxis
              orientation="bottom"
              tickLabelProps={() => ({
                angle: -45,
                textAnchor: 'end',
                dx: '-0.5em',
                dy: '0',
                fontSize: 12,
                fill: '#dfdfdf',
              })}
            />
            <AnimatedAxis
              orientation="left"
              tickLabelProps={() => ({
                dx: '-0.25em',
                dy: '0.25em',
                fontSize: 12,
                fill: '#dfdfdf',
                textAnchor: 'end',
              })}
            />

            <AnimatedGrid columns={false} numTicks={5} stroke="#13273c" strokeWidth={0.5} />

            <AnimatedLineSeries
              dataKey={data?.title}
              data={data.data}
              xAccessor={accessors.xAccessor}
              yAccessor={accessors.yAccessor}
              colorAccessor={() => color}
            />
            {dataCompare && (
              <AnimatedLineSeries
                dataKey={dataCompare.title}
                data={dataCompare.data}
                xAccessor={accessors.xAccessor}
                yAccessor={accessors.yAccessor}
                colorAccessor={() => '#ffffe6'}
              />
            )}

            <Tooltip
              showVerticalCrosshair
              snapTooltipToDatumX
              snapTooltipToDatumY
              showSeriesGlyphs
              detectBounds
              renderTooltip={({ tooltipData, tooltipTop = 0, tooltipLeft = 0 }) => {
                const nearest = tooltipData?.nearestDatum;
                if (!nearest) return null;
                const d = nearest.datum;

                const info = tooltipData.datumByKey[data?.title];
                const compareInfo = tooltipData.datumByKey[dataCompare?.title];

                return (
                  <>
                    {tooltipData?.nearestDatum && (
                      <Line
                        from={{ x: tooltipLeft, y: 0 }}
                        to={{ x: tooltipLeft, y: height }}
                        stroke="red"
                        strokeWidth={1}
                        pointerEvents="none"
                      />
                    )}
                    <TooltipInPortal
                      top={tooltipTop}
                      left={tooltipLeft}
                      style={{
                        position: 'absolute',
                        background: '#13273c',
                        padding: '0.5rem',
                        boxShadow: '0 0 4px rgba(0,0,0,0.3)',
                        zIndex: 9999,
                        pointerEvents: 'none',
                        color: '#dfdfdf',
                        fontSize: '0.875rem',
                      }}
                    >
                      <div>
                        <span>{formatDate(accessors.xAccessor(d))}</span>
                        <span>{unit && ` (${unit})`}</span>
                      </div>
                      {!dataCompare && (
                        <div>
                          {numberFormat(accessors.yAccessor(d))} {unit}
                        </div>
                      )}
                      {dataCompare && (
                        <div>
                          <div>
                            {info.key} - {numberFormat((info.datum as { y: number }).y)}
                          </div>
                          <div>
                            {compareInfo.key} -{' '}
                            {numberFormat((compareInfo.datum as { y: number }).y)}
                          </div>
                        </div>
                      )}
                    </TooltipInPortal>
                  </>
                );
              }}
            />
          </XYChart>
        )}
      </ParentSize>
    </div>
  );
};

export default LineChart;
