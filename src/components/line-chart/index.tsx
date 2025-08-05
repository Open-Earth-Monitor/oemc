import React, { useCallback, useState } from 'react';

// import { AxisLeft, AxisBottom } from '@visx/axis';
// import { localPoint } from '@visx/event';
// import { Group } from '@visx/group';
// import { scaleLinear, scaleTime } from '@visx/scale';
// import { Line, LinePath } from '@visx/shape';
// import { useTooltip } from '@visx/tooltip';

// import ChartLegend from './legend';
// import ChartTooltip from './tooltip';
// import { DataPoint, LineChartProps, TooltipData } from './types';
// import {
//   bisectDate,
//   COMPARE_DATA_COLOR,
//   DATA_COLOR,
//   formatDate,
//   getDate,
//   height,
//   margin,
//   tickProps,
//   width,
// } from './utils';

// const LineChart: React.FC<LineChartProps> = ({ data: chartData, dataCompare, color }) => {
//   const compare = dataCompare?.data || [];
//   const data = chartData?.data || [];
//   const x = (d: DataPoint) => new Date(d.x).valueOf();
//   const y = (d: DataPoint) => d.y;

//   // Calculate scales
//   const xMin = Math.min(...data.map(x), ...compare.map(x));
//   const xMax = Math.max(...data.map(x), ...compare.map(x));
//   const yMin = Math.min(...data.map(y), ...compare.map(y));
//   const yMax = Math.max(...data.map(y), ...compare.map(y));

//   const xScale = scaleTime({
//     range: [0, width - margin.left - margin.right],
//     domain: [xMin, xMax],
//   });

//   const yScale = scaleLinear({
//     range: [height - margin.top - margin.bottom, 0],
//     domain: [yMin, yMax],
//   });

//   const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop, tooltipOpen } =
//     useTooltip<TooltipData>();

//   const getTooltipData = (data: DataPoint[], x: number) => {
//     const x0 = xScale.invert(x - margin.left);
//     const index = bisectDate(data, x0, 1);
//     const d0 = data[index - 1];
//     const d1 = data[index];
//     let d = d0;
//     if (d1 && getDate(d1)) {
//       d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
//     }
//     return d;
//   };

//   const handleMouseMove = useCallback(
//     (event: React.TouchEvent<SVGGElement> | React.MouseEvent<SVGGElement, MouseEvent>) => {
//       const { x } = localPoint(event) || { x: 0 };
//       const tooltipData = getTooltipData(data, x);
//       const tooltipDataCompare = getTooltipData(compare, x);

//       showTooltip({
//         tooltipData: {
//           ...tooltipData,
//           ...(!!compare.length && {
//             compare: { ...tooltipDataCompare, tooltipTop: yScale(tooltipDataCompare?.y) },
//           }),
//         },
//         tooltipLeft: x - margin.left,
//         tooltipTop: yScale(tooltipData?.y),
//       });
//     },
//     [showTooltip, yScale, xScale]
//   );

//   const handleMouseLeave = () => {
//     hideTooltip();
//   };

//   return (
//     <div>
//       <svg width={width} height={height}>
//         <Group width={width} left={margin.left} top={margin.top}>
//           {/* Y Axis */}
//           <AxisLeft tickValues={[yMin, yMax]} scale={yScale} {...tickProps} />

//           {/* X Axis */}
//           <AxisBottom
//             tickValues={[xMin, xMax]}
//             scale={xScale}
//             tickFormat={(value: number) => formatDate(value)}
//             top={height - margin.top - margin.bottom}
//             {...tickProps}
//             tickLabelProps={(a, i) => {
//               return {
//                 ...tickProps.tickLabelProps,
//                 textAnchor: i === 0 ? 'start' : 'end',
//               };
//             }}
//           />

//           <Group width={width} left={0} top={0}>
//             {/* Line */}
//             <LinePath
//               data={data}
//               x={(d) => xScale(x(d))}
//               y={(d) => yScale(y(d))}
//               stroke={color || DATA_COLOR}
//               strokeWidth={2}
//             />

//             {/* Compare Line */}
//             {!!compare?.length && (
//               <LinePath
//                 data={compare}
//                 x={(d) => xScale(x(d))}
//                 y={(d) => yScale(y(d))}
//                 stroke={COMPARE_DATA_COLOR}
//                 strokeWidth={2}
//               />
//             )}
//           </Group>

//           {/* Transparent rectangle for mouse events */}
//           <rect
//             x={0}
//             y={0}
//             width={width - margin.left - margin.right}
//             height={height - margin.top - margin.bottom}
//             fill="transparent"
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//           />

//           {/* Tooltip vertical line */}
//           {tooltipOpen && (
//             <g>
//               <Line
//                 from={{ x: tooltipLeft, y: 0 }}
//                 to={{ x: tooltipLeft, y: height - margin.top - margin.bottom }}
//                 stroke="#2E3333"
//                 strokeWidth={2}
//                 pointerEvents="none"
//               />

//               <circle
//                 cx={tooltipLeft}
//                 cy={tooltipTop}
//                 r={4}
//                 fill={color}
//                 stroke="white"
//                 strokeWidth={2}
//                 pointerEvents="none"
//               />
//               {!!compare.length && (
//                 <circle
//                   cx={tooltipLeft}
//                   cy={tooltipData.compare.tooltipTop}
//                   r={4}
//                   fill={COMPARE_DATA_COLOR}
//                   stroke="white"
//                   strokeWidth={2}
//                   pointerEvents="none"
//                 />
//               )}
//             </g>
//           )}
//         </Group>
//       </svg>

//       {/* Tooltip */}
//       {tooltipOpen && (
//         <ChartTooltip
//           tooltipData={tooltipData}
//           tooltipLeft={tooltipLeft}
//           tooltipTop={tooltipTop}
//           dataTitle={chartData?.title}
//           dataCompareTitle={dataCompare?.title}
//         />
//       )}

//       {chartData?.title && dataCompare?.title && (
//         <ChartLegend title={chartData.title} compareTitle={dataCompare.title} />
//       )}
//     </div>
//   );
// };

// export default LineChart;

import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
} from '@visx/xychart';
import { TooltipWithBounds, Tooltip, useTooltipInPortal, useTooltip } from '@visx/tooltip';
const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

export const LineChart = ({
  data,
  dataCompare,
  color,
}: {
  data: any;
  dataCompare?: any;
  color: string;
}) => {
  const [tooltipShouldDetectBounds, setTooltipShouldDetectBounds] = useState(true);
  const { containerRef, containerBounds, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
    detectBounds: tooltipShouldDetectBounds,
  });

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<string>({
    // initial tooltip state
    tooltipOpen: true,
    tooltipLeft: 300 / 3,
    tooltipTop: 300 / 3,
    tooltipData: 'Move me with your mouse or finger',
  });
  return (
    <div ref={containerRef} className="relative overflow-visible">
      <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={false} numTicks={4} />
        <AnimatedLineSeries
          dataKey="Line 1"
          data={data.data}
          {...accessors}
          colorAccessor={() => color}
        />
        {dataCompare && <AnimatedLineSeries dataKey="Line 2" data={dataCompare} {...accessors} />}
        {/* <Tooltip
          showVerticalCrosshair
          snapTooltipToDatumX
          snapTooltipToDatumY
          showSeriesGlyphs
          detectBounds
          renderTooltip={({ tooltipData }) => {
            const nearest = tooltipData?.nearestDatum;
            if (!nearest) return null;

            const d = nearest.datum;
            const key = nearest.key;

            return (
              <div className="bg-white pointer-events-none z-[3000] max-w-[220px] bg-white-500 p-2 shadow">
                <div>
                  <strong>{key}</strong>
                </div>
                <div>{`${accessors.xAccessor(d)}`}</div>
                <div>{`${accessors.yAccessor(d)}`}</div>
              </div>
            );
          }}
        /> */}
        {tooltipOpen && (
          <TooltipWithBounds
            key={tooltipData}
            top={tooltipTop}
            left={tooltipLeft}
            className="pointer-events-none z-[3000] max-w-[220px] bg-white-500 p-2 shadow"
          >
            {tooltipData}
          </TooltipWithBounds>
        )}
      </XYChart>
    </div>
  );
};

export default LineChart;
