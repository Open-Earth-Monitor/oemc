import Link from 'next/link';

import { useTrackEvent } from '@/lib/analytics';
import cn from '@/lib/classnames';

import { postWebTraffic } from '@/hooks/web-traffic';

type CardHeaderProps = {
  theme: string;
  title: string;
  color: string;
  id: string;
  type: 'monitor' | 'geostory';
  className?: string;
  loading?: boolean;
  bbox?: number[];
};

const CardHeader: React.FC<CardHeaderProps> = ({
  theme,
  title,
  color,
  id,
  type,
  className,
  bbox,
}) => {
  const track = useTrackEvent();

  const handleClick = () => {
    postWebTraffic(type === 'monitor' ? { monitor_id: id } : { geostory_id: id });

    if (type === 'monitor') {
      track('Monitor Open', {
        props: { monitor_id: id, title, source: 'explore-sidebar' },
      });
    } else {
      track('Geostory Open', {
        props: { geostory_id: id, title, source: 'explore-sidebar' },
      });
    }
  };

  return (
    <div
      className={cn('z-20 flex flex-col space-y-4 font-medium', {
        [className]: !!className,
      })}
    >
      <div className="flex items-center space-x-3 divide-x divide-white-500/[0.2] text-xs">
        <span className="text-white-500" data-testid={`card-type-${id}`}>
          {type === 'monitor' ? 'Monitor' : 'Geostory'}
        </span>
        <span className="pl-3" data-testid={`card-theme-${id}`}>
          {theme}
        </span>
      </div>
      <Link
        href={`/explore/${type === 'monitor' ? 'monitor' : 'geostory'}/${id}?bbox=${bbox}`}
        onClick={handleClick}
        data-testid={`card-title-link-${id}`}
        className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
      >
        <h2
          style={{ color }}
          className="relative inline-block before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 group-hover/monitor-card:translate-x-2 group-hover/monitor-card:before:w-full"
        >
          {title}
        </h2>
      </Link>
    </div>
  );
};

export default CardHeader;
