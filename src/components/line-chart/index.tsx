import React from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { useTooltip, Tooltip } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { bisectCenter } from 'd3-array';
import { format } from 'd3-format';

const numberFormat = format(',.2f');

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
const colorAxis = '#848981';
const tickProps = {
  hideTicks: true,
  stroke: colorAxis,
  tickStroke: colorAxis,
  strokeWidth: 0.5,
  tickLabelProps: {
    fill: colorAxis,
    fontSize: 12,
    letterSpacing: '0.5px',
    fontWeight: 400,
  },
};

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

  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } =
    useTooltip<DataPoint>();

  // Handle mouse move to show tooltip
  const handleMouseMove = (event: React.MouseEvent<SVGRectElement>) => {
    const { x: mouseX } = localPoint(event) || { x: 0 };

    // Adjust mouse position for margins
    const xValue = xScale.invert(mouseX - margin.left);

    // Find the closest data point
    const xValues = data.map(x);
    const index = bisectCenter(xValues, xValue.getTime());
    const closestPoint = data[index];

    if (closestPoint) {
      // Tooltip positioning
      const adjustedLeft = xScale(x(closestPoint)) + margin.left;
      const adjustedTop = yScale(y(closestPoint)) + margin.top;

      showTooltip({
        tooltipData: closestPoint,
        tooltipLeft: adjustedLeft,
        tooltipTop: adjustedTop,
      });
    }
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  return (
    <div>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {/* Y Axis */}
          <AxisLeft scale={yScale} {...tickProps} />

          {/* X Axis */}
          <AxisBottom scale={xScale} top={height - margin.top - margin.bottom} {...tickProps} />

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
        </Group>
      </svg>

      {/* Tooltip */}
      {/* {tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
          }}
        >
          <div>
            <strong>Date:</strong> {new Date(tooltipData.x).toLocaleDateString()}
          </div>
          <div>
            <strong>Value:</strong> {numberFormat(tooltipData.y)}
          </div>
        </Tooltip>
      )} */}
    </div>
  );
};

export default LineChart;
