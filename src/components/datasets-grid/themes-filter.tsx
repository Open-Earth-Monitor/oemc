import { useCallback } from 'react';

import cn from '@/lib/classnames';

import { ThemeID, THEMES } from '@/components/theme-filter/constants';
import { Button } from '@/components/ui/button';

const themesIds = THEMES.map((theme) => theme.id);

const ThemesFilter = ({
  selectedThemes,
  setSelectedThemes,
}: {
  selectedThemes: ThemeID[];
  setSelectedThemes: React.Dispatch<React.SetStateAction<ThemeID[]>>;
}) => {
  const toggleTheme = useCallback(
    (theme: ThemeID) => {
      const allThemeIds = themesIds;
      const isAll = theme === 'All';

      setSelectedThemes((prev) => {
        const isAllSelected = prev.includes('All');

        // If clicking 'all'
        if (isAll) {
          return isAllSelected ? [] : allThemeIds;
        }

        // If 'all' is selected and user clicks any other: replace with only clicked theme
        if (isAllSelected) {
          return [theme];
        }

        const isSelected = prev.includes(theme);

        // Toggle individual theme
        const updated = isSelected ? prev.filter((t) => t !== theme) : [...prev, theme];

        const nonAllThemes = allThemeIds.filter((id) => id !== 'All');
        const allSelected =
          nonAllThemes.every((t) => updated.includes(t)) && !updated.includes('All');

        return allSelected ? [...updated, 'All'] : updated;
      });
    },
    [setSelectedThemes]
  );

  return (
    <div className="flex w-full flex-wrap gap-2.5">
      {THEMES.map((theme) => {
        const isActive = selectedThemes.includes(theme.id);
        const isAllSelected = selectedThemes.includes('All');
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
