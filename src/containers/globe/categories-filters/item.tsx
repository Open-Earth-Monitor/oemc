import { useState } from 'react';

import cn from '@/lib/classnames';

import { CATEGORIES_COLORS } from '@/constants/categories';

const Filter = ({ id, label, Icon }) => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div
      className={cn({
        'flex cursor-pointer items-center space-x-2.5 rounded-full border border-white-950 px-4 py-2.5 hover:bg-white-950':
          true,
        'border-transparent': isActive,
      })}
      onClick={() => setIsActive(!isActive)}
      style={{
        color: isActive ? '#0b1825' : CATEGORIES_COLORS[id]?.base,
        backgroundColor: isActive ? CATEGORIES_COLORS[id]?.base : 'transparent',
      }}
    >
      <div
        className={cn({
          'rounded-full bg-white-950 p-2': true,
        })}
        style={{ backgroundColor: isActive ? '#ffffe6' : 'hsla(60, 100%, 95%, 0.05)' }}
      >
        <Icon
          style={{
            backgroundColor: isActive ? CATEGORIES_COLORS[id]?.base : CATEGORIES_COLORS[id]?.light,
            color: CATEGORIES_COLORS[id]?.base,
          }}
          className={cn({
            'h-6 w-6 fill-current': true,
          })}
        />
      </div>

      <span
        className={cn({
          'whitespace-nowrap font-medium text-white-500': true,
          'text-black-400': isActive,
        })}
      >
        {label}
      </span>
    </div>
  );
};

export default Filter;
