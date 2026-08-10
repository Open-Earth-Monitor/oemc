import type { FC } from 'react';

import cn from '@/lib/classnames';

/**
 * A range separator: an en/em dash or hyphen with whitespace on both sides.
 * Requiring the whitespace keeps compound dates ("2000-01-01") intact.
 */
const SPACED_SEPARATOR = /^(.+?)(\s+[–—-]\s+)(.+)$/;
/** Fallback for unspaced ranges ("2000-2010"), only when there is exactly one dash. */
const SINGLE_DASH = /^([^–—-]+)([–—-])([^–—-]+)$/;

const splitRange = (label: string): [string, string, string] | null => {
  const match = SPACED_SEPARATOR.exec(label) ?? SINGLE_DASH.exec(label);
  return match ? [match[1], match[2], match[3]] : null;
};

/**
 * Renders a layer date label so that a range too long for its container breaks at the
 * separator instead of overflowing: each side is kept unbreakable and the only wrap
 * opportunity is the dash. Labels that aren't ranges are left to wrap on their own.
 */
export const DateRangeLabel: FC<{ label?: string | null; className?: string }> = ({
  label,
  className,
}) => {
  if (!label) return null;

  const parts = splitRange(label);

  if (!parts) {
    return <span className={cn('whitespace-normal break-words', className)}>{label}</span>;
  }

  const [start, separator, end] = parts;

  return (
    <span className={cn('whitespace-normal', className)}>
      <span className="whitespace-nowrap">{`${start}${separator.trimEnd()}`}</span>{' '}
      <span className="whitespace-nowrap">{end}</span>
    </span>
  );
};

export default DateRangeLabel;
