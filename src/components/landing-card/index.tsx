import { FC } from 'react';

import { motion } from 'framer-motion';

import type { Geostory } from '@/types/geostories';
import type { Monitor } from '@/types/monitors';

import CardGeostory from '@/components/landing-card/geostories';
import CardMonitor from '@/components/landing-card/monitors';

const Card: FC<Monitor | Geostory> = ({ entity_type, ...data }) => {
  const isMonitor = entity_type === 'monitor';
  const isGeostory = entity_type === 'geo_story';

  return (
    <motion.div
      className="overflow-hidden font-inter"
      whileHover={{
        translateY: '-10px',
      }}
      transition={{ duration: 0.3 }}
    >
      {isMonitor && <CardMonitor {...data} />}
      {isGeostory && <CardGeostory {...data} />}
    </motion.div>
  );
};

export default Card;
