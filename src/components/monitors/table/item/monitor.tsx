import Link from 'next/link';

import { motion } from 'framer-motion';

import { cn } from '@/lib/classnames';

import { MonitorParsed } from '@/types/monitors';

import { usePostWebTraffic } from '@/hooks/web-traffic';

export const MonitorLink = ({
  id,
  color,
  title,
  isMobile,
}: MonitorParsed & { isMobile?: boolean }) => {
  const handleClick = () => {
    usePostWebTraffic([
      {
        monitors: id,
      },
    ]);
    console.log('WT4 -', 'monitors', id);
  };

  return (
    <Link
      data-testid={`monitor-item-${id}`}
      key={id}
      href={`/map/${id}/datasets`}
      onClick={handleClick}
      className={cn({ 'flex items-center  px-2 font-bold sm:px-4': true, 'border-l-4': !isMobile })}
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
};

export default MonitorLink;
