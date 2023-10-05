import type { FC } from 'react';

import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

import { GeoStory } from '@/types/geostories';

const GeostoryCard: FC<GeoStory & { color: string }> = ({ id, color, title }) => {
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
          <div data-testid="geostory-tag" className="font-inter text-xs">
            GEOSTORY
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
