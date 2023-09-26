'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';

import { useMonitor, useMonitorGeostories } from '@/hooks/monitors';

import Loading from '@/components/loading';

const GeostoriesPage = () => {
  const pathname = usePathname();
  const monitorId = pathname.split('/')[2];
  const { data: monitor } = useMonitor({ monitor_id: monitorId }, { enabled: !!monitorId });
  const { data, isLoading, isFetched, isError } = useMonitorGeostories({ monitor_id: monitorId });
  const { color } = monitor ?? {};
  return (
    <>
      {isLoading && <Loading visible={isLoading} />}
      {isFetched && !isError && (
        <div className="space-y-4 text-brand-500">
          {data.map(({ id, title }) => (
            <Link key={id} href={`/map/geostories/${id}`} className="">
              <AnimatePresence>
                <motion.div
                  style={{ backgroundColor: color }}
                  whileHover={{
                    boxShadow: `4px 4px ${color}`,
                    border: '2px solid hsla(0, 0%, 13%, 1)',
                  }}
                  transition={{ duration: 0 }}
                  className="mb-5 space-y-2 px-6 py-5"
                >
                  <span className="font-inter text-xs">GEOSTORY</span>
                  <h1 className="text-2xl">{title}</h1>
                </motion.div>
              </AnimatePresence>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default GeostoriesPage;
