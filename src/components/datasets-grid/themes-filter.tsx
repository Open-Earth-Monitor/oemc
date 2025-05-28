import { Button } from '@/components/ui/button';
import { THEMES } from '@/components/theme-filter/constants';

import { useSyncCategory } from '@/hooks/sync-query';
import { Themes } from '../theme-filter/types';

const ThemesFilter = () => {
  const [, setCategory] = useSyncCategory();

  const handleClick = (type: Themes) => {
    setCategory(type);
  };

  return (
    <div className="flex w-full items-center space-x-2.5">
      {THEMES.map((theme) => (
        <Button variant="outline" key={theme.id} onClick={() => handleClick(theme?.id)}>
          {theme.Icon && <theme.Icon />}
          <span>{theme.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ThemesFilter;
