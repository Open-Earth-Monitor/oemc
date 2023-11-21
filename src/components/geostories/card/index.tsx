import type { FC } from 'react';

import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

import { Geostory } from '@/types/geostories';

import { TAG_STYLE } from '@/styles/constants';

const GeostoryCard: FC<Geostory & { color: string }> = ({ id, color, title, theme }) => {
  return (
    <Link href={`/map/geostories/${id}`} data-testid={`geostory-link-${id}`}>
      <AnimatePresence>
        <motion.div
          style={{ backgroundColor: color }}
          whileHover={{
            boxShadow: `6px 6px ${color}`,
            outline: '2px solid hsla(0, 0%, 13%, 1)',
            translateX: '-6px',
            translateY: '-6px',
          }}
          transition={{ duration: 0.15 }}
          className="space-y-4 px-6 py-5"
          data-testid={`geostory-item-${id}`}
        >
          <div className="flex h-full items-center space-x-2.5 divide-x-2 divide-secondary-950 text-xs">
            <span data-testid="geostory-tag" className={TAG_STYLE}>
              geostory
            </span>
            <span className="pl-2.5">{theme}</span>
          </div>
          <h2 className="font-satoshi text-2xl font-bold" data-testid={`geostory-title-${id}`}>
            {title}
          </h2>
        </motion.div>
      </AnimatePresence>
    </Link>
  );
};

export default GeostoryCard;
