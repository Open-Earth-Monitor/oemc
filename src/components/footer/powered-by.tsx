'use client';

import { FC } from 'react';

import { cn } from '@/lib/classnames';

const LINK_STYLES =
  'rounded underline decoration-transparent underline-offset-2 transition-colors hover:decoration-inherit focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green';

export const PoweredBy: FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => {
  return (
    <p
      className={cn({
        'font-medium text-white-50': true,
        'text-xs': size === 'sm',
        'text-sm': size === 'md',
      })}
      data-testid="powered-by"
    >
      Powered by{' '}
      <a
        href="https://www.vizzuality.com"
        target="_blank"
        rel="noopener noreferrer"
        title="Vizzuality"
        className={LINK_STYLES}
        data-test-id="vizzuality-link"
      >
        Vizzuality
      </a>{' '}
      and{' '}
      <a
        href="https://gilab.rs"
        target="_blank"
        rel="noopener noreferrer"
        title="GILAB"
        className={LINK_STYLES}
        data-test-id="gilab-link"
      >
        GILAB
      </a>
    </p>
  );
};

export default PoweredBy;
