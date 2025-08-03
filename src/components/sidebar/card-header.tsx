import Link from 'next/link';
import { useParams } from 'next/navigation';

import cn from '@/lib/classnames';

import { postWebTraffic } from '@/hooks/web-traffic';
import { BBox } from 'ol/render/canvas/Executor';

type CardHeaderProps = {
  theme: string;
  title: string;
  color: string;
  id: string;
  type: 'monitor' | 'geostory';
  className?: string;
  loading?: boolean;
  bbox?: BBox;
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
  const params = useParams();
  const geostoryId = params.geostory_id;

  const handleClick = () => {
    postWebTraffic({
      geostory_id: geostoryId,
    });
    console.info('WT2 -', 'geostories', id);
  };

  return (
    <div
      className={cn('flex flex-col space-y-4 font-medium', {
        [className]: !!className,
      })}
    >
      <div className="flex items-center space-x-5 divide-x divide-white-900">
        <span>{type === 'monitor' ? 'Monitor' : 'Geostory'}</span>
        <span className="pl-5" style={{ color }}>
          {theme}
        </span>
      </div>
      <Link
        href={`/explore/${type === 'monitor' ? 'monitor' : 'geostory'}/${id}?bbox=${bbox}`}
        onClick={handleClick}
      >
        <h2 style={{ color }} className="text-[22px]">
          {title}
        </h2>
      </Link>
    </div>
  );
};

export default CardHeader;
