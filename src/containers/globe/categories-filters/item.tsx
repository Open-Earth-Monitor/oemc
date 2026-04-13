import { useCallback, useMemo } from 'react';

import cn from '@/lib/classnames';

import { CATEGORIES, CATEGORIES_COLORS } from '@/constants/categories';

import { useSyncCategories } from '@/hooks/sync-query';

type ItemProps = {
  id: (typeof CATEGORIES)[number]['id'];
  label: string;
  theme?: 'plain' | 'colored'; // 'plain' keeps the icon color fixed, 'colored' changes the icon color based on category
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  className?: string;
};

const Filter = ({ id, label, Icon, className, theme }: ItemProps) => {
  const [categoriesFilter, setCategoriesFilter] = useSyncCategories();

  const categories = useMemo(() => CATEGORIES.map((c) => c.id), []);
  const isActive = useMemo(() => {
    if (categoriesFilter === 'All') {
      return true;
    }
    return categoriesFilter?.includes(id);
  }, [categoriesFilter, id]);

  const handleCategory = useCallback(() => {
    setCategoriesFilter((prev) => {
      if (prev === 'All') {
        const next = categories?.filter((catId) => catId !== id);
        return next.length === categories.length ? 'All' : next;
      }

      if (!prev) return [id];

      const exists = prev?.includes(id);

      const next = exists ? prev?.filter((catId) => catId !== id) : [...prev, id];

      if (next.length === categories.length) {
        return 'All';
      }

      return next;
    });
  }, [id, categories, setCategoriesFilter]);

  return (
    <button
      className={cn(
        'group/sidebar flex h-12 w-12 items-center justify-center rounded-full border bg-white-950 text-white-700 transition-all duration-500 hover:text-white-500',
        { 'bg-custom-gradient text-black-500': isActive },
        className
      )}
      onClick={handleCategory}
      style={{
        ['--category-color' as string]: CATEGORIES_COLORS[id]?.base,
        color: isActive
          ? CATEGORIES_COLORS[id]?.base
          : theme === 'plain'
          ? '#FFFFE6'
          : CATEGORIES_COLORS[id]?.base,
        backgroundColor: isActive ? CATEGORIES_COLORS[id]?.base : undefined,
      }}
    >
      <div
        className={cn(
          'flex h-[38px] w-[38px] items-center justify-center rounded-full transition-colors duration-300',
          isActive ? 'bg-[#ffffe6]' : 'bg-white-950 group-hover:bg-[var(--category-color)]'
        )}
        style={{ ['--category-color' as string]: CATEGORIES_COLORS[id]?.light }}
      >
        <Icon
          style={{
            backgroundColor: isActive ? CATEGORIES_COLORS[id]?.base : CATEGORIES_COLORS[id]?.light,
            color: theme === 'plain' ? '#FFFFE6' : CATEGORIES_COLORS[id]?.base,
          }}
          className={cn({
            'h-6 w-6 fill-current stroke-black-100 stroke-[0.2px]': true,
          })}
        />
      </div>

      <div
        className={cn({
          'mr-4 flex whitespace-nowrap font-medium text-white-500 transition-colors duration-300':
            true,
          'text-black-400': isActive && theme !== 'plain',
        })}
      >
        {label}
      </div>
    </button>
  );
};

export default Filter;
