import { useCallback } from 'react';

import cn from '@/lib/classnames';

import type { Category } from '@/constants/categories';

import { ThemeID, CATEGORIES } from '@/components/theme-filter/constants';
import { Button } from '@/components/ui/button';

const ThemesFilter = ({
  selectedThemes,
  setSelectedThemes,
}: {
  selectedThemes: Category['id'][];
  setSelectedThemes: React.Dispatch<React.SetStateAction<Category['id'][]>>;
}) => {
  const toggleTheme = useCallback(
    (theme: ThemeID) => {
      setSelectedThemes((prev) => {
        if (theme === 'All') {
          return [];
        }

        const isSelected = !!prev.length && prev.includes(theme);

        // Toggle individual theme
        return isSelected ? prev.filter((t) => t !== theme) : [...prev, theme];
      });
    },
    [setSelectedThemes]
  );

  return (
    <div className="flex w-full flex-wrap gap-2.5">
      {CATEGORIES.map((theme) => {
        const isActive =
          theme.id !== 'All' && !!selectedThemes.length && selectedThemes.includes(theme.id);
        const isAllSelected = !selectedThemes.length;
        const isAll = theme.id === 'All';
        const variant =
          (isAllSelected && isAll) || (!isAllSelected && isActive) ? 'default' : 'outline';
        return (
          <Button
            key={theme.id}
            variant={variant}
            onClick={() => toggleTheme(theme.id)}
            className={cn(
              'hover:border-white-500 hover:bg-transparent hover:text-white-500',
              !isActive
            )}
          >
            {theme.Icon && <theme.Icon />}
            <span>{theme.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default ThemesFilter;
