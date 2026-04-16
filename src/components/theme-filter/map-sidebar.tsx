'use client';

import { useSyncCategories } from '@/hooks/sync-query';

import { ALL_CATEGORY, CATEGORIES } from '@/constants/categories';
import { SIDEBAR_THEME_FILTERS } from '@/constants/sidebar';

import SidebarItem from './map-sidebar-item';

const SidebarThemeFilters = () => {
  const [categories] = useSyncCategories();
  const selectedCategory = categories?.[0] ?? null;

  return (
    <aside
      aria-label="Theme filters"
      className="fixed bottom-0 left-0 top-0 z-10 flex w-full flex-col justify-start gap-y-3 bg-black-400 py-12 text-white-500"
      style={{ width: SIDEBAR_THEME_FILTERS }}
    >
      <span className="mx-auto flex items-center text-center text-xs text-white-500/50">
        Select a Category
      </span>
      <nav
        aria-label="Theme categories"
        className="mx-auto flex h-full flex-col items-center justify-start space-y-2 p-2"
      >
        <ul role="list" className="flex w-full flex-col items-center space-y-3">
          {[ALL_CATEGORY, ...CATEGORIES].map((category) => (
            <li
              key={category.id}
              className="flex w-full items-center justify-center"
              aria-current={selectedCategory === category.id ? 'true' : undefined}
            >
              <SidebarItem
                Icon={category.Icon}
                button={{ id: category.id, label: category.label }}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarThemeFilters;
