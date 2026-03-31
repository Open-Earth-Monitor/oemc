'use client';

import { useCallback } from 'react';

import cn from '@/lib/classnames';

import { LIVE_UPDATES_CONTENT } from '@/constants/live-updates';

import { useSyncMediaFilter } from '@/hooks/sync-query';

type ItemProps = {
  id: string;
  label: string;
  className?: string;
};

const selectableIds = LIVE_UPDATES_CONTENT.map((c) => c.id).filter((id) => id !== 'all');

const Filter = ({
  id,
  label,
  onClick,
}: ItemProps & {
  onClick: (id: string) => void;
}) => {
  const [mediaFilterState] = useSyncMediaFilter();
  const isAllSelected =
    mediaFilterState.length === selectableIds.length &&
    selectableIds.every((itemId) => mediaFilterState.includes(itemId));

  const isSelected = id === 'all' ? isAllSelected : !isAllSelected && mediaFilterState.includes(id);

  return (
    <button
      className={cn(
        'group flex cursor-pointer items-center gap-2.5 rounded-full border p-1 hover:border-accent-green hover:bg-accent-green/10 hover:text-white-500',
        isSelected ? 'border-accent-green bg-accent-green' : 'border-white-800 bg-transparent'
      )}
      onClick={() => onClick(id)}
    >
      <div
        className={cn(
          'flex whitespace-nowrap px-3.5 py-2 font-medium',
          isSelected ? 'text-black-500 group-hover:text-white-500' : 'text-white-500'
        )}
      >
        {label}
      </div>
    </button>
  );
};

export default function Item({ id, label, className }: ItemProps) {
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
      <Filter id={id} label={label} className={className} onClick={handleFilter} />
    </div>
  );
}
