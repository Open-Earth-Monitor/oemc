import React, { useCallback } from 'react';
import { Group } from '@visx/group';
import { Line, LinePath } from '@visx/shape';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { bisector } from '@visx/vendor/d3-array';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { format } from 'd3-format';

const numberFormat = format(',.2f');

const formatDate = (value: number | string) =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

interface DataPoint {
  x: string | number;
  y: number;
}

interface LineChartProps {
  data: DataPoint[];
  dataCompare?: DataPoint[];
}

const margin = { top: 25, right: 20, bottom: 30, left: 65 };
const height = 200;
const width = 400;
const colorAxis = '#2E3333';
const tickProps = {
  hideTicks: true,
  stroke: colorAxis,
  tickStroke: colorAxis,
  strokeWidth: 0.5,
  tickLabelProps: {
    fill: '#848981',
    fontSize: 12,
    letterSpacing: '-0.1px',
    fontWeight: 400,
  },
};

const bisectDate = bisector<DataPoint, Date>((d) => new Date(d.x)).left;
const getDate = (d: DataPoint) => new Date(d.x);

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const x = (d: DataPoint) => new Date(d.x).valueOf();
  const y = (d: DataPoint) => d.y;

  // Calculate scales
  const xMin = Math.min(...data.map(x));
  const xMax = Math.max(...data.map(x));
  const yMin = Math.min(...data.map(y));
  const yMax = Math.max(...data.map(y));

  const xScale = scaleTime({
    range: [0, width - margin.left - margin.right],
    domain: [xMin, xMax],
  });

  const yScale = scaleLinear({
    range: [height - margin.top - margin.bottom, 0],
    domain: [yMin, yMax],
  });

  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop, tooltipOpen } =
    useTooltip<DataPoint>();

  const handleMouseMove = useCallback(
    (event: React.TouchEvent<SVGGElement> | React.MouseEvent<SVGGElement, MouseEvent>) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(x - margin.left);
      const index = bisectDate(data, x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];
      let d = d0;
      if (d1 && getDate(d1)) {
        d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
      }

      showTooltip({
        tooltipData: d,
        tooltipLeft: x - margin.left,
        tooltipTop: yScale(d.y),
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

          {/* Line */}
          <LinePath
            data={data}
            x={(d) => xScale(x(d))}
            y={(d) => yScale(y(d))}
            stroke="#35B6D8"
            strokeWidth={2}
          />

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
                fill="#35B6D8"
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </Group>
      </svg>

      {/* Tooltip */}
      {tooltipOpen && (
        <Tooltip
          top={tooltipTop - 12}
          left={tooltipLeft + 60}
          key={Math.random()}
          className="TOOLTIP"
          style={{
            ...defaultStyles,
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: '4px',
          }}
        >
          <div className="bg-brand-500/80 p-2">
            <p className="font-satoshi text-[10px]">{!!tooltipData && formatDate(tooltipData.x)}</p>
            <p className="font-inter text-xs">{!!tooltipData && numberFormat(tooltipData.y)}</p>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default LineChart;
