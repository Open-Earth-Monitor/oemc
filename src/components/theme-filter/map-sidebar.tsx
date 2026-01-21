'use client';

import { cn } from '@/lib/classnames';

import { CATEGORIES } from '@/constants/categories';
import { SIDEBAR_THEME_FILTERS } from '@/constants/sidebar';

import SidebarItem from './map-sidebar-item';

const SidebarThemeFilters = () => {
  return (
    <div
      className="fixed bottom-0 left-0 top-0 z-10 h-screen  bg-black-500 text-white-500"
      style={{ width: SIDEBAR_THEME_FILTERS }}
    >
      <div className={cn('flex w-full flex-col items-start space-y-2 py-8 text-sm text-white-500')}>
        {CATEGORIES.map((category) => {
          const Icon = category.Icon;

          return (
            <SidebarItem
              key={category.id}
              Icon={Icon}
              button={{
                id: category.id,
                label: category.label,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SidebarThemeFilters;
