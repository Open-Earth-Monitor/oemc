/* eslint jsx-a11y/label-has-associated-control: 'off', @typescript-eslint/no-explicit-any: 'off' */
import React, { useEffect, useMemo, useState } from 'react';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { PickD3Scale, scaleTime, scaleLinear } from '@visx/scale';
import { extent } from '@visx/vendor/d3-array';
import { AnnotationProps } from './histogram';

type ExampleControlsProps = AnnotationProps & {
  children: (props: ProvidedProps) => React.ReactNode;
};

type ProvidedProps = {
  data: AppleStock[];
  getDate: (d: AppleStock) => number;
  getStockValue: (d: AppleStock) => number;
  title: string;
  xScale: PickD3Scale<'time', number>;
  yScale: PickD3Scale<'linear', number>;
};

const data = appleStock.slice(-100);
const getDate = (d: AppleStock) => new Date(d.date).valueOf();
const getStockValue = (d: AppleStock) => d.close;

export default function ExampleControls({
  width,
  height,
  compact = false,
  children,
}: ExampleControlsProps) {
  const xScale = useMemo(
    () =>
      scaleTime({
        domain: extent(data, (d) => getDate(d)) as number[],
        range: [0, width],
      }),
    [width]
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: extent(data, (d) => getStockValue(d)) as number[],
        range: [height - 100, 100],
      }),
    [height]
  );

  const [title] = useState('Title');

  return (
    <>
      {children({
        data,
        getDate,
        getStockValue,
        title,
        xScale,
        yScale,
      })}
    </>
  );
}
