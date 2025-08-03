import { bisector } from '@visx/vendor/d3-array';

import { DataPoint } from './types';

export const formatDate = (value: number | string) =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

export const DATA_COLOR = '#35B6D8';
export const COMPARE_DATA_COLOR = '#F06BAF';
export const margin = { top: 25, right: 20, bottom: 30, left: 30 };
export const height = 200;
export const width = 280;
export const colorAxis = '#2E3333';
export const tickProps = {
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

export const bisectDate = bisector<DataPoint, Date>((d) => new Date(d.x)).left;
export const getDate = (d: DataPoint) => new Date(d.x);
