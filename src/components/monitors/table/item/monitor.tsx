import Link from 'next/link';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/classnames';

import { MonitorParsed } from '@/types/monitors';

import { postWebTraffic } from '@/hooks/web-traffic';
import { useMonitors } from '@/hooks/monitors';

export const MonitorLink = ({
  id,
  color,
  title,
  isMobile,
}: MonitorParsed & { isMobile?: boolean }) => {
  const handleClick = () => {
    postWebTraffic({
      monitor_id: id,
    });
    console.info('WT4 -', 'monitors', id);
  };

  const { data: monitorsData } = useMonitors();

  const monitorData = useMemo(
    () => monitorsData?.find((monitor) => monitor.id === id),
    [id, monitorsData]
  );
  const monitorBbox = monitorData?.monitor_bbox;
  const urlParams = monitorBbox ? `/?bbox=${monitorBbox}` : '';

  return (
    <Link
      data-testid={`monitor-item-${id}`}
      key={id}
      href={`/map/${id}/datasets${urlParams}`}
      onClick={handleClick}
      className={cn({
        'flex items-center px-2 text-left font-bold sm:px-4': true,
        'border-l-4': !isMobile,
      })}
      style={{ borderLeftColor: color }}
    >
      <motion.h2 initial="initial" whileHover="hover" className="text-xl font-bold sm:text-2xl">
        <span className="block text-left">{title}</span>
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
