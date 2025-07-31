import React, { useCallback } from 'react';

import { AxisLeft, AxisBottom } from '@visx/axis';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { scaleLinear, scaleTime } from '@visx/scale';
import { Line, LinePath } from '@visx/shape';
import { useTooltip } from '@visx/tooltip';

import ChartLegend from './legend';
import ChartTooltip from './tooltip';
import { DataPoint, LineChartProps, TooltipData } from './types';
import {
  bisectDate,
  COMPARE_DATA_COLOR,
  DATA_COLOR,
  formatDate,
  getDate,
  height,
  margin,
  tickProps,
  width,
} from './utils';

const LineChart: React.FC<LineChartProps> = ({ data: chartData, dataCompare, color }) => {
  const compare = dataCompare?.data || [];
  const data = chartData?.data || [];
  const x = (d: DataPoint) => new Date(d.x).valueOf();
  const y = (d: DataPoint) => d.y;

  // Calculate scales
  const xMin = Math.min(...data.map(x), ...compare.map(x));
  const xMax = Math.max(...data.map(x), ...compare.map(x));
  const yMin = Math.min(...data.map(y), ...compare.map(y));
  const yMax = Math.max(...data.map(y), ...compare.map(y));

  const xScale = scaleTime({
    range: [0, width - margin.left - margin.right],
    domain: [xMin, xMax],
  });

  const yScale = scaleLinear({
    range: [height - margin.top - margin.bottom, 0],
    domain: [yMin, yMax],
  });

  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop, tooltipOpen } =
    useTooltip<TooltipData>();

  const getTooltipData = (data: DataPoint[], x: number) => {
    const x0 = xScale.invert(x - margin.left);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && getDate(d1)) {
      d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
    }
    return d;
  };

  const handleMouseMove = useCallback(
    (event: React.TouchEvent<SVGGElement> | React.MouseEvent<SVGGElement, MouseEvent>) => {
      const { x } = localPoint(event) || { x: 0 };
      const tooltipData = getTooltipData(data, x);
      const tooltipDataCompare = getTooltipData(compare, x);

      showTooltip({
        tooltipData: {
          ...tooltipData,
          ...(!!compare.length && {
            compare: { ...tooltipDataCompare, tooltipTop: yScale(tooltipDataCompare?.y) },
          }),
        },
        tooltipLeft: x - margin.left,
        tooltipTop: yScale(tooltipData?.y),
      });
    },
    [showTooltip, yScale, xScale]
  );

  const handleMouseLeave = () => {
    hideTooltip();
  };

  return (
    <div>
      <svg width={width} height={height}>
        <Group width={width} left={margin.left} top={margin.top}>
          {/* Y Axis */}
          <AxisLeft tickValues={[yMin, yMax]} scale={yScale} {...tickProps} />

          {/* X Axis */}
          <AxisBottom
            tickValues={[xMin, xMax]}
            scale={xScale}
            tickFormat={(value: number) => formatDate(value)}
            top={height - margin.top - margin.bottom}
            {...tickProps}
            tickLabelProps={(a, i) => {
              return {
                ...tickProps.tickLabelProps,
                textAnchor: i === 0 ? 'start' : 'end',
              };
            }}
          />

          <Group width={width} left={0} top={0}>
            {/* Line */}
            <LinePath
              data={data}
              x={(d) => xScale(x(d))}
              y={(d) => yScale(y(d))}
              stroke={color || DATA_COLOR}
              strokeWidth={2}
            />

            {/* Compare Line */}
            {!!compare?.length && (
              <LinePath
                data={compare}
                x={(d) => xScale(x(d))}
                y={(d) => yScale(y(d))}
                stroke={COMPARE_DATA_COLOR}
                strokeWidth={2}
              />
            )}
          </Group>

          {/* Transparent rectangle for mouse events */}
          <rect
            x={0}
            y={0}
            width={width - margin.left - margin.right}
            height={height - margin.top - margin.bottom}
            fill="transparent"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />

          {/* Tooltip vertical line */}
          {tooltipOpen && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: height - margin.top - margin.bottom }}
                stroke="#2E3333"
                strokeWidth={2}
                pointerEvents="none"
              />

              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={color}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
              {!!compare.length && (
                <circle
                  cx={tooltipLeft}
                  cy={tooltipData.compare.tooltipTop}
                  r={4}
                  fill={COMPARE_DATA_COLOR}
                  stroke="white"
                  strokeWidth={2}
                  pointerEvents="none"
                />
              )}
            </g>
          )}
        </Group>
      </svg>

      {/* Tooltip */}
      {tooltipOpen && (
        <ChartTooltip
          tooltipData={tooltipData}
          tooltipLeft={tooltipLeft}
          tooltipTop={tooltipTop}
          dataTitle={chartData?.title}
          dataCompareTitle={dataCompare?.title}
        />
      )}

      {chartData?.title && dataCompare?.title && (
        <ChartLegend title={chartData.title} compareTitle={dataCompare.title} />
      )}
    </div>
  );
};

export default LineChart;
