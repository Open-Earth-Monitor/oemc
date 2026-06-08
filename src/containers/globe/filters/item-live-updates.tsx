'use client';

import { useCallback } from 'react';

import cn from '@/lib/classnames';

import { LIVE_UPDATES_CONTENT } from '@/constants/live-updates';

import { useSyncMediaFilter } from '@/hooks/sync-query';

import { IconTooltip } from '@/components/ui/tooltip';

type ItemProps = {
  id: string;
  label: string;
  content?: boolean;
  className?: string;
};

const selectableIds = LIVE_UPDATES_CONTENT.map((c) => c.id).filter((id) => id !== 'all');

const Filter = ({
  id,
  label,
  content = true,
  onClick,
}: ItemProps & {
  onClick: (id: string) => void;
}) => {
  const [mediaFilterState] = useSyncMediaFilter();
  const isAllSelected =
    mediaFilterState.length === selectableIds.length &&
    selectableIds.every((itemId) => mediaFilterState.includes(itemId));

  const isSelected = id === 'all' ? isAllSelected : !isAllSelected && mediaFilterState.includes(id);

  const button = (
    <button
      disabled={!content}
      className={cn(
        'group/filter-live flex items-center gap-2.5 rounded-full border p-1',
        content
          ? 'cursor-pointer hover:border-accent-green hover:bg-accent-green/10 hover:text-white-500'
          : 'pointer-events-none opacity-50',
        isSelected ? 'border-accent-green bg-accent-green' : 'border-white-800 bg-transparent'
      )}
      onClick={() => content && onClick(id)}
    >
      <div
        className={cn(
          'flex whitespace-nowrap px-3.5 py-2 font-medium',
          isSelected ? 'text-black-500 group-hover/filter-live:text-white-500' : 'text-white-500'
        )}
      >
        {label}
      </div>
    </button>
  );

  if (content) return button;

  return (
    <IconTooltip label="Coming soon">
      <span className="inline-flex cursor-not-allowed">{button}</span>
    </IconTooltip>
  );
};

export default function Item({ id, label, content, className }: ItemProps) {
  const [_, setMediaFilter] = useSyncMediaFilter();
  const handleFilter = useCallback(
    (clickedId: string) => {
      setMediaFilter((prev) => {
        const isAllSelected =
          prev.length === selectableIds.length &&
          selectableIds.every((itemId) => prev.includes(itemId));

        if (clickedId === 'all') {
          return selectableIds;
        }

        if (isAllSelected) {
          return [clickedId];
        }

        if (prev.includes(clickedId)) {
          const next = prev.filter((itemId) => itemId !== clickedId);
          return next.length === 0 ? prev : next;
        }

        return [...prev, clickedId];
      });
    },
    [setMediaFilter]
  );

  return (
    <div className="flex gap-2">
      <Filter
        id={id}
        label={label}
        content={content}
        className={className}
        onClick={handleFilter}
      />
    </div>
  );
}
