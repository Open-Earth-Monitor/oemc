import { FC } from 'react';
import { MouseEvent } from 'react';

import { cn } from '@/lib/classnames';

export type SidebarProps = {
  type?: 'all' | 'agriculture' | 'water' | 'climate&health' | 'soils' | 'forest' | 'biodiversity';
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
  const handleClick = (e: MouseEvent<HTMLButtonElement>, type: SidebarProps['type']) => {
    console.log('sketch', e);
  };

  const isActive = true;
  return (
    <button
      key={button.id}
      className={cn(
        'h-full w-full grow overflow-hidden p-3.5 transition-all duration-500 hover:bg-custom-gradient'
      )}
      onClick={(e) => handleClick(e, button.id)}
    >
      <div
        className={cn(
          'group flex flex-col items-center space-y-4 transition-transform duration-300'
        )}
      >
        <Icon className="h-10 w-10 text-white-500 group-hover:text-black-500" />

        <span className="text-xs font-medium text-white-700 transition-none group-hover:text-black-500">
          {button.label}
        </span>
      </div>
    </button>
  );
};

export default SidebarItem;
