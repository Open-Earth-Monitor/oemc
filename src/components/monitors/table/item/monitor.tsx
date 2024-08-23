import Link from 'next/link';

import { motion } from 'framer-motion';

import { MonitorParsed } from '@/types/monitors';

export const MonitorLink = ({ id, color, title }: MonitorParsed) => (
  <Link
    data-testid={`monitor-item-${id}`}
    key={id}
    href={`/map/${id}/datasets`}
    className={`flex items-center border-l-4 px-2 font-bold sm:px-4`}
    style={{ borderLeftColor: color }}
  >
    <motion.h2 initial="initial" whileHover="hover" className="text-xl font-bold sm:text-2xl">
      <span className="block">{title}.</span>
      <motion.div
        className="h-0.5 w-0 bg-secondary-500"
        variants={{
          initial: { width: 0 },
          hover: { width: '100%' },
        }}
      />
    </motion.h2>
  </Link>
);

export default MonitorLink;
