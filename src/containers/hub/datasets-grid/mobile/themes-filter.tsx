'use client';

import { useCallback, useMemo } from 'react';

import cn from '@/lib/classnames';

import type { Theme } from '@/constants/themes';

import { ThemeID, THEMES } from '@/components/theme-filter/constants';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown';

export default function ThemesFilter({
  selectedThemes,
  setSelectedThemes,
}: {
  selectedThemes: Theme[];
  setSelectedThemes: React.Dispatch<React.SetStateAction<Theme[]>>;
}) {
  const isAllSelected = !selectedThemes.length;

  const toggleTheme = useCallback(
    (theme: ThemeID) => {
      setSelectedThemes((prev) => {
        if (theme === 'All') return [];
        const isSelected = !!prev.length && prev.includes(theme);
        return isSelected ? prev.filter((t) => t !== theme) : [...prev, theme];
      });
    },
    [setSelectedThemes]
  );

  const checkedMap = useMemo(() => {
    const map = new Map<ThemeID, boolean>();
    THEMES.forEach(({ id }) => {
      if (id === 'All') {
        map.set('All', isAllSelected);
      } else {
        map.set(id, !isAllSelected && selectedThemes.includes(id));
      }
    });
    return map;
  }, [isAllSelected, selectedThemes]);

  const selectedCount = isAllSelected
    ? THEMES.filter((t) => t.id !== 'All').length
    : selectedThemes.length;

  return (
    <div className="grid grid-cols-12 items-center justify-between gap-2">
      <p className="col-span-3">Categories</p>
      <DropdownMenu
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'col-span-9 h-9 w-full')}
      >
        <DropdownMenuTrigger classNameContent="px-0">
          <div className="inline-flex w-full items-center gap-2">
            <span className="truncate text-sm text-white-500" title={selectedThemes.join(', ')}>
              {!!selectedThemes.length ? selectedThemes.join(', ') : 'All'}
            </span>
            {selectedThemes.length > 0 && (
              <span className={cn('px-1.5 py-0.5 text-xs')}>{selectedCount}</span>
            )}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Select themes</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {THEMES.map((theme) => (
            <DropdownMenuCheckboxItem
              key={theme.id}
              checked={checkedMap.get(theme.id)}
              onCheckedChange={() => toggleTheme(theme.id)}
              className="gap-2"
            >
              {theme.Icon && <theme.Icon className="h-4 w-4" />}
              {theme.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
