'use client';

import { ComponentProps } from 'react';

import {
  useRive,
  Layout,
  Fit,
  Alignment,
  UseRiveOptions,
  UseRiveParameters,
} from '@rive-app/react-canvas';

export default function Simple({
  src,
  props,
  riveParams,
  opts,
}: {
  src: string;
  props?: (props: ComponentProps<'canvas'>) => JSX.Element;
  riveParams?: UseRiveParameters;
  opts?: Partial<UseRiveOptions>;
}) {
  const { rive, RiveComponent } = useRive({
    src,
    autoplay: true,
    stateMachines: 'State Machine 1',
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    ...riveParams,
    ...opts,
  });
  return <RiveComponent {...props} />;
}
