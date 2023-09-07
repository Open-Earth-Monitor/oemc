import { FC, PropsWithChildren } from 'react';

import cx from 'clsx';

import type { LegendItemProps } from './types';

type LegendItemPropsWithChildren = PropsWithChildren<LegendItemProps>;

const LegendItem: FC<LegendItemPropsWithChildren> = ({
  id,
  name,
  description,
  icon,
  children,
}: LegendItemPropsWithChildren) => (
  <div key={id} className="px-5 py-2.5">
    <div className="flex">
      <div
        className={cx({
          relative: true,
          'pl-5': icon,
        })}
      >
        {icon && <div className="absolute left-0 top-0">{icon}</div>}
        <div className="font-heading text-sm text-white">{name}</div>
      </div>
    </div>

    <div className="text-sm text-gray-300">{description}</div>

    {children && <div className="mt-2.5">{children}</div>}
  </div>
);

export default LegendItem;
