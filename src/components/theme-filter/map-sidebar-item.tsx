import { FC } from 'react';

import { cn } from '@/lib/classnames';

import { ALL_CATEGORY, CategoryId, CATEGORIES_COLORS } from '@/constants/categories';

import { useSyncCategories } from '@/hooks/sync-query';

type SidebarProps = {
  type?: CategoryId | typeof ALL_CATEGORY.id;
  enabled?: boolean;
};

type SidebarButtonProps = {
  id: SidebarProps['type'];
  label: string;
};

export type SidebarItemProps = {
  Icon: FC<React.SVGProps<SVGSVGElement>>;
  button: SidebarButtonProps;
};

const SidebarItem = ({ Icon, button }: SidebarItemProps) => {
  const [categories, setCategory] = useSyncCategories();

  const category = categories?.[0] ?? null;
  const isActive = category === button.id;

  return (
    <button
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-full bg-white-950 text-white-700 transition-all duration-300 hover:text-white-500',
        { 'text-black-500': isActive }
      )}
      onClick={() => setCategory([button.id] as CategoryId[] | 'All')}
    >
      <div
        className={cn(
          'group flex flex-col items-center space-y-4 rounded-full bg-white-950 p-2 transition-transform duration-300'
        )}
        style={{ color: isActive ? 'text-black-500' : CATEGORIES_COLORS[button.id]?.base }}
      >
        <Icon
          style={{ color: isActive ? 'text-black-500' : CATEGORIES_COLORS[button.id]?.base }}
          className="h-6 w-6 fill-current stroke-black-100 stroke-[0.2px]"
        />

        <span className="sr-only">{button.label}</span>
      </div>
    </button>
  );
};

export default SidebarItem;
