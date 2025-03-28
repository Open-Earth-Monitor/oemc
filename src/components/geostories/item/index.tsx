import type { FC } from 'react';

import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

import { Geostory } from '@/types/geostories';

import { TAG_STYLE } from '@/styles/constants';
import { usePostWebTraffic } from '@/hooks/web-traffic';

const GeostoryItem: FC<Geostory & { color: string }> = ({ id, color, title }) => {
  const handleClick = () => {
    usePostWebTraffic({
      geostory_id: id,
    });
    console.info('WT5 -', 'geostories', id);
  };
  return (
    <Link href={`/map/geostories/${id}`} data-testid={`geostory-link-${id}`} onClick={handleClick}>
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
          <div data-testid="geostory-tag" className={TAG_STYLE}>
            geostory
          </div>
          <h2 className="font-satoshi text-2xl font-bold" data-testid={`geostory-title-${id}`}>
            {title}
          </h2>
        </motion.div>
      </AnimatePresence>
    </Link>
  );
};

export default GeostoryItem;
