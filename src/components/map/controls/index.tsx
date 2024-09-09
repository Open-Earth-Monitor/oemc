import { Children, FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/classnames';

import type { ControlsProps } from './types';

type ControlsPropsWithChildren = PropsWithChildren<ControlsProps>;

export const Controls: FC<ControlsPropsWithChildren> = ({
  className,
  children,
}: ControlsPropsWithChildren) => (
  <div
    className={cn({
      'absolute right-2.5 top-[81px] z-40 flex flex-col space-y-1.5': true,
      [className]: !!className,
    })}
  >
    {Children.map(children, (child) => child)}
  </div>
);

export default Controls;
