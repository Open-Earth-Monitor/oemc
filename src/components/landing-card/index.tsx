import { FC } from 'react';

import { motion } from 'framer-motion';

import CardGeostory from '@/components/landing-card/geostories';
import CardMonitor from '@/components/landing-card/monitors';

const Card: FC<{
  id: string;
  title: string;
}> = ({ title, id, ...data }) => {
  const isMonitor = id.startsWith('m');
  const isGeostory = id.startsWith('g');

  return (
    <motion.div
      className="overflow-hidden font-inter"
      whileHover={{
        translateY: '-10px',
      }}
      transition={{ duration: 0.3 }}
    >
      {isMonitor && <CardMonitor id={id} title={title} {...data} />}
      {isGeostory && <CardGeostory id={id} title={title} {...data} />}
    </motion.div>
  );
};

export default Card;
