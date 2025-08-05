import { FC, useMemo } from 'react';

import { cn } from '@/lib/classnames';

import type { Theme } from '@/constants/themes';

import { useSyncTheme } from '@/hooks/sync-query';

export type SidebarProps = {
  type?: Theme | 'All';
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
  const [theme, setTheme] = useSyncTheme();

  const handleClick = (type: Theme | 'All') => {
    setTheme(type);
  };

  const isActive = useMemo(() => {
    return theme === button.id;
  }, [theme, button.id]);
  console.log(button.id, theme, isActive);
  return (
    <button
      key={button.id}
      className={cn(
        'group/sidebar h-full w-full grow overflow-hidden p-3.5 text-white-700 transition-all duration-500 hover:bg-white-950 hover:text-white-500',
        { 'bg-custom-gradient text-black-500': isActive }
      )}
      onClick={() => handleClick(button.id)}
    >
      <div
        className={cn({
          'group flex flex-col items-center space-y-4 transition-transform duration-300': true,
          'text-black-500': isActive,
        })}
      >
        <Icon
          className={cn({
            'h-10 w-10  fill-current text-white-500': true,
            'text-black-500': isActive,
            'group-hover/sidebar:text-white-500': !isActive,
          })}
        />

        <span
          className={cn({
            'text-xs font-medium  transition-none ': true,
            'text-black-500': isActive,
            'group-hover/sidebar:text-white-500': !isActive,
          })}
        >
          {button.label}
        </span>
      </div>
    </button>
  );
};

export default SidebarItem;
