import { min, max } from 'd3-array';

interface UseParams {
  x: (d: any) => number;
  y: (d: any) => number;
  data: any[];
  dataCompare?: any[];
}

interface MaxMinValues {
  xMinValue: number;
  xMaxValue: number;
  yMinValue: number;
  yMaxValue: number;
}

export function useGetMinData({ x, y, data, dataCompare }: UseParams): MaxMinValues {
  // Determine the datasets to use
  const primaryData = data;
  const comparisonData = dataCompare || [];

  // Combine data if comparison is active, or use only primary data
  const combinedData = dataCompare ? [...primaryData, ...comparisonData] : primaryData;

  // Calculate yMinValue and yMaxValue
  const yMinValue = min(combinedData, y) ?? 0; // Default to 0 if undefined
  const yMaxValue = max(combinedData, y) ?? 0;

  // Calculate xMinValue and xMaxValue
  const xMinValue = Math.min(...combinedData.map(x));
  const xMaxValue = Math.max(...combinedData.map(x));

  // Return calculated values
  return {
    xMinValue,
    xMaxValue,
    yMinValue,
    yMaxValue,
  };
}
