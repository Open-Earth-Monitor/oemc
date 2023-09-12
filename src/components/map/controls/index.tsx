import { Children, FC, PropsWithChildren } from 'react';

import cx from 'clsx';

import type { ControlsProps } from './types';

type ControlsPropsWithChildren = PropsWithChildren<ControlsProps>;

export const Controls: FC<ControlsPropsWithChildren> = ({
  className = 'absolute bottom-16 left-[551px]',
  children,
}: ControlsPropsWithChildren) => (
  <div
    className={cx({
      'flex flex-col space-y-1': true,
      [className]: !!className,
    })}
  >
    {Children.map(children, (child) => child)}
  </div>
);

export default Controls;
