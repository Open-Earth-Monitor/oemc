'use client';

import React, { useCallback, useMemo } from 'react';

import cn from '@/lib/classnames';
import type { CategoryId } from '@/constants/categories';
import { ALL_CATEGORY, CATEGORIES } from '@/constants/categories';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown';

type Props = {
  selectedThemes: CategoryId[];
  setSelectedThemes: React.Dispatch<React.SetStateAction<CategoryId[]>>;
};

export default function ThemesFilter({ selectedThemes, setSelectedThemes }: Props) {
  const isAllSelected = selectedThemes.length === 0;

  const toggleCategory = useCallback(
    (id: CategoryId | 'All') => {
      setSelectedThemes((prev) => {
        if (id === 'All') return [];

        const isSelected = prev.includes(id as CategoryId);
        return isSelected ? prev.filter((t) => t !== id) : [...prev, id as CategoryId];
      });
    },
    [setSelectedThemes]
  );

  const checkedMap = useMemo(() => {
    const map = new Map<CategoryId | 'All', boolean>();
    for (const { id } of [...CATEGORIES, ALL_CATEGORY]) {
      if (id === 'All') map.set('All', isAllSelected);
      else map.set(id, selectedThemes.includes(id as CategoryId & 'All'));
    }
    return map;
  }, [isAllSelected, selectedThemes]);

  const selectedCount = isAllSelected
    ? [...CATEGORIES, ALL_CATEGORY].filter((t) => t.id !== 'All').length
    : selectedThemes.length;

  const selectedLabel = isAllSelected ? 'All' : selectedThemes.join(', ');

  return (
    <div className="grid grid-cols-12 items-center justify-between gap-2">
      <p className="col-span-3">Categories</p>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'col-span-9 h-9 w-full'
          )}
        >
          <div className="inline-flex w-full items-center gap-2">
            <span className="truncate text-sm text-white-500" title={selectedLabel}>
              {selectedLabel}
            </span>
            {!isAllSelected && <span className={cn('px-1.5 py-0.5 text-xs')}>{selectedCount}</span>}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Select categories</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {CATEGORIES.map((category) => (
            <DropdownMenuCheckboxItem
              key={category.id}
              checked={checkedMap.get(category.id) ?? false}
              onCheckedChange={() => toggleCategory(category.id)}
              className="gap-2"
            >
              {category.Icon ? <category.Icon className="h-4 w-4" /> : null}
              {category.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
