import Link from 'next/link';

import { motion } from 'framer-motion';

import { cn } from '@/lib/classnames';

import { MonitorParsed } from '@/types/monitors';

import { usePostWebTraffic } from '@/hooks/web-traffic';
import { useMonitor, useMonitors } from '@/hooks/monitors';

export const MonitorLink = ({
  id,
  color,
  title,
  isMobile,
}: MonitorParsed & { isMobile?: boolean }) => {
  const handleClick = () => {
    usePostWebTraffic({
      monitor_id: id,
    });
    console.info('WT4 -', 'monitors', id);
  };

  const { data: monitorsData } = useMonitors();

  const monitorData = monitorsData?.find((monitor) => monitor.id === id);
  const monitorBbox = monitorData?.monitor_bbox;
  const [minLon, minLat, maxLon, maxLat] = monitorBbox || [];
  const centerLon = (minLon + maxLon) / 2;
  const centerLat = (minLat + maxLat) / 2;

  const urlParams = monitorBbox ? `/?center=[${centerLon},${centerLat}]&zoom=5` : '';

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
