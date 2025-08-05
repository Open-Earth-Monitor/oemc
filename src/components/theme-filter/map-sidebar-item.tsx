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
    if (type === 'All') {
      setTheme([]);
    } else {
      setTheme(type);
    }
  };

  const isActive = useMemo(() => {
    return theme === button.id;
  }, [theme, button.id]);

  return (
    <button
      key={button.id}
      className={cn(
        'h-full w-full grow overflow-hidden p-3.5 transition-all duration-500 hover:bg-custom-gradient',
        { 'bg-custom-gradient': isActive }
      )}
      onClick={() => handleClick(button.id)}
    >
      <div
        className={cn(
          'group flex flex-col items-center space-y-4 transition-transform duration-300'
        )}
      >
        <Icon
          className={cn('h-10 w-10  fill-current group-hover:text-black-500', {
            'text-black-500': isActive,
          })}
        />

        <span
          className={cn(
            'text-xs font-medium text-white-700 transition-none group-hover:text-black-500',
            {
              'text-black-500': isActive,
            }
          )}
        >
          {button.label}
        </span>
      </div>
    </button>
  );
};

export default SidebarItem;
