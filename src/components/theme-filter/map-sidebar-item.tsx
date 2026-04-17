'use client';

import { FC, useState } from 'react';

import { ALL_CATEGORY, CategoryId, CATEGORIES_COLORS } from '@/constants/categories';
import { useSyncCategories } from '@/hooks/sync-query';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const GRADIENT = 'linear-gradient(132deg, #1EEDBF 0%, #75A1FF 100%)';
const GRADIENT_GLOW = '0 0 14px 3px rgba(30, 237, 191, 0.35)';
// black-400 — sidebar bg, used in gradient border trick
const SIDEBAR_BG = '#0B1825';

type SidebarButtonProps = {
  id: CategoryId | typeof ALL_CATEGORY.id;
  label: string;
};

export type SidebarItemProps = {
  Icon: FC<React.SVGProps<SVGSVGElement>>;
  button: SidebarButtonProps;
};

const SidebarItem = ({ Icon, button: btn }: SidebarItemProps) => {
  const [categories, setCategory] = useSyncCategories();
  const [isHovered, setIsHovered] = useState(false);

  const isActive = categories?.[0] === btn.id;
  const isAll = btn.id === ALL_CATEGORY.id;
  const categoryColor = CATEGORIES_COLORS[btn.id]?.base ?? CATEGORIES_COLORS['Unknown']?.base;

  const handleClick = () => setCategory([btn.id] as CategoryId[] | 'All');

  /**
   * Outer button style — border-2 + p-[2px] always present (constant size = 40px).
   * Only colors change per state. Total: inner 32px + padding 4px + border 4px = 40px.
   *
   * Active:   border + bg both = categoryColor (or gradient for All)
   * Hover:    border = categoryColor, bg = transparent
   * Inactive: border = white/20%, bg = transparent
   */
  const outerStyle = (): React.CSSProperties => {
    if (isActive) {
      if (isAll) {
        return {
          border: '1px solid transparent',
          background: GRADIENT,
          backgroundOrigin: 'border-box',
          boxShadow: GRADIENT_GLOW,
        };
      }
      return {
        border: `1px solid ${categoryColor}`,
        background: categoryColor,
        boxShadow: `0 0 14px 4px ${categoryColor}55`,
      };
    }

    if (isHovered) {
      if (isAll) {
        return {
          border: '1px solid transparent',
          background: `linear-gradient(${SIDEBAR_BG}, ${SIDEBAR_BG}) padding-box, ${GRADIENT} border-box`,
        };
      }
      return { border: `1px solid ${categoryColor}` };
    }

    return { border: '1px solid rgba(255, 255, 230, 0.2)' };
  };

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <button
          aria-label={btn.label}
          aria-pressed={isActive}
          className="rounded-full p-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-black-500"
          style={outerStyle()}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Inner — always 32px (h-8 w-8), bg + icon color change per state */}
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full p-2 transition-all duration-300"
            style={{
              background: isActive ? '#FFFFE6' : 'rgba(255, 255, 230, 0.2)',
              // color cascades into SVG stroke-current + fill-current
              color: isActive ? '#09131D' : categoryColor,
            }}
          >
            <Icon className="h-6 w-6 fill-current stroke-current stroke-[0.2px]" />
            <span className="sr-only">{btn.label}</span>
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        sideOffset={12}
        className="rounded-full bg-white-500 px-3 py-2 font-satoshi text-xs font-medium text-black-500 shadow-none"
      >
        {btn.label}
      </TooltipContent>
    </Tooltip>
  );
};

export default SidebarItem;
