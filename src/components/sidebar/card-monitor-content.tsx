import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import { useMonitor } from '@/hooks/monitors';

import Loading from '@/components/loading';
import CardHeader from '@/components/sidebar/card-header';

function DatasetCardMonitor({
  color,
  id,
  mainContent,
}: {
  color: string;
  id: string;
  mainContent?: boolean;
}) {
  const { data: monitorData, isLoading: isLoadingMonitor } = useMonitor({ monitor_id: id });
  const { theme, title, geostories, monitor_bbox } = monitorData || {};

  if (!monitorData) return null;

  return (
    <div
      className="group/monitor-card space-y-2 border-l p-[18px] font-satoshi transition-all duration-200 hover:border-l-4"
      style={{ borderLeftColor: color }}
    >
      <CardHeader
        theme={theme}
        title={title}
        type="monitor"
        color={color}
        id={id}
        bbox={monitor_bbox}
      />
      {isLoadingMonitor && <Loading />}
      {!!geostories.length && !isLoadingMonitor && mainContent && (
        <div className="space-y-2 pt-1 text-xs">
          <p className="text-white-500/50">Related geostories</p>
          <ul className="space-y-2.5">
            {geostories.map((geostory, index) => (
              <li key={geostory.id} className="flex w-full justify-between font-bold">
                <Link
                  href={`/explore/geostory/${geostory.id}${
                    geostory.geostory_bbox ? `?bbox=${geostory.geostory_bbox.join(',')}` : ''
                  }`}
                  data-testid={`geostory-link-${geostory.id}`}
                  className="font-bold underline decoration-gray-400 hover:decoration-white-500 hover:decoration-2"
                >
                  {geostory.title}
                </Link>
                {geostories.length === index + 1 && (
                  <Link
                    href={`/explore/monitor/${id}${
                      geostory.geostory_bbox ? `?bbox=${geostory.geostory_bbox.join(',')}` : ''
                    }`}
                    className="flex items-center"
                  >
                    <span className="ml-2 inline-block w-0 overflow-hidden whitespace-nowrap font-inter text-xs text-white-500/50 opacity-0 transition-all duration-300 ease-in-out group-hover/monitor-card:w-full group-hover/monitor-card:opacity-100">
                      Go to monitor
                    </span>

                    <ChevronRight className="inline h-6 w-6 shrink-0 text-white-500/50 group-hover/monitor-card:text-accent-green" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DatasetCardMonitor;
