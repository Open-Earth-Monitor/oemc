import { FC, PropsWithChildren } from 'react';

import cn from '@/lib/classnames';

const Badge: FC<PropsWithChildren<{ className?: HTMLSpanElement['className'] }>> = ({
  className,
  children,
}) => {
  return (
    <span
      className={cn(
        'flex w-fit space-x-1 rounded-full bg-white-500 bg-opacity-5 px-2 text-sm font-medium',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
