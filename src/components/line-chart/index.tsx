import React, { useCallback } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { min, max } from 'd3-array';
import { Line } from '@visx/shape';
import { localPoint } from '@visx/event';
import { bisect } from 'd3-array';
import { TooltipWithBounds, useTooltip } from '@visx/tooltip';
import { GlyphCircle } from '@visx/glyph';

// Example dimensions
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

export const LineChart = ({ data, data2 }) => {
  const x = (d) => new Date(d.x).valueOf();
  const y = (d) => d.y;

  const xMax = width - 120;
  const yMax = height - 80;

  const yMinData1 = Number(min(data, y));
  const yMinData2 = Number(min(data2, y));

  const yMaxData1 = Number(max(data, y));
  const yMaxData2 = Number(max(data2, y));

  const yMinValue = data2 && yMinData2 < yMinData1 ? yMinData2 : yMinData1;
  const yMaxValue = data2 && yMaxData2 > yMaxData1 ? yMaxData2 : yMaxData1;

  // Get the minimum and maximum x-values for both datasets
  const xMinData1 = Math.min(...data.map(x));
  const xMaxData1 = Math.max(...data.map(x));
  const xMinData2 = data2 ? Math.min(...data2.map(x)) : xMinData1;
  const xMaxData2 = data2 ? Math.max(...data2.map(x)) : xMaxData1;

  // Use the minimum x-value and maximum x-value from both datasets
  const xMinValue = data2 && xMinData2 < xMinData1 ? xMinData2 : xMinData1;
  const xMaxValue = data2 && xMaxData2 > xMaxData1 ? xMaxData2 : xMaxData1;

  // Set up the xScale for the first dataset
  const xScale = scaleTime({
    range: [0, xMax],
    domain: [xMinValue, xMaxValue],
    nice: true,
  });

  // Set up the xScale2 for the second dataset
  const xScale2 = scaleTime({
    range: [0, xMax],
    domain: [xMinValue, xMaxValue],
    nice: true,
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [yMinValue, yMaxValue],
  });

  const yScale2 = scaleLinear({
    range: [yMax, 0],
    domain: [yMinValue, yMaxValue],
  });

  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip();

  const margin = { top: 25, right: 20, bottom: 30, left: 65 }; // Use the same margin values

  const handleTooltip = useCallback(
    (event) => {
      const { x: xPoint } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(xPoint - margin.left); // Use margin.left here to account for the offset

      // Find the closest data point using bisect
      const index = bisect(data.map(x), x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];
      let d = d0;

      // Ensure we're selecting the closest point
      if (d1 && x(d1)) {
        d = x0 - x(d0) > x(d1) - x0 ? d1 : d0;
      }

      // Show the tooltip
      showTooltip({
        tooltipData: d,
        tooltipLeft: xScale(x(d)),
        tooltipTop: yScale(y(d)),
      });
    },
    [showTooltip, xScale, yScale, data]
  );

  return (
    <div>
      <svg width={width} height={height}>
        <Group left={65} top={25}>
          <AxisLeft scale={yScale} {...tickProps} />
          <AxisBottom scale={xScale} top={yMax} {...tickProps} />
          {/* Top border */}
          <Line from={{ x: 0, y: 0 }} to={{ x: xMax, y: 0 }} stroke={colorAxis} strokeWidth={0.5} />
          {/* Right border */}
          <Line
            from={{ x: xMax, y: 0 }}
            to={{ x: xMax, y: yMax }}
            stroke={colorAxis}
            strokeWidth={0.5}
          />
          {/* Bottom border */}
          <Line
            from={{ x: 0, y: yMax }}
            to={{ x: xMax, y: yMax }}
            stroke={colorAxis}
            strokeWidth={0.5}
          />
          {/* Left border */}
          <Line from={{ x: 0, y: 0 }} to={{ x: 0, y: yMax }} stroke={colorAxis} strokeWidth={0.5} />

          <LinePath
            data={data}
            x={(d) => xScale(x(d))}
            y={(d) => yScale(y(d))}
            stroke="#35B6D8"
            strokeWidth={2}
            onMouseEnter={handleTooltip}
            onMouseLeave={hideTooltip}
          />
          {data2 && data2.length && (
            <LinePath
              data={data2}
              x={(d) => xScale2(x(d))}
              y={(d) => yScale2(y(d))}
              stroke="#F06BAF"
              strokeWidth={2}
            />
          )}
        </Group>
        {tooltipData && (
          <>
            {/* Tooltip with HTML content */}
            <TooltipWithBounds key={Math.random()} top={tooltipTop} left={tooltipLeft}>
              <div>
                <p>{new Date(tooltipData.x).toLocaleDateString()}</p>
                <p>{tooltipData.y}</p>
              </div>
            </TooltipWithBounds>

            {/* Render GlyphCircle directly in the SVG */}

            <g>
              <GlyphCircle
                cx={tooltipLeft + margin.left + margin.right} // Use cx for x-position
                cy={tooltipTop} // Use cy for y-position
                r={5} // Adjust size of the circle
                fill={'red'}
                stroke={'white'}
                strokeWidth={2}
              />
              <Line
                from={{ x: tooltipLeft + margin.left + margin.right, y: 0 }}
                to={{ x: tooltipLeft, y: height }}
                stroke={'#EDF2F7'}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="4,2"
              />
            </g>
          </>
        )}
      </svg>
    </div>
  );
};

export default LineChart;
