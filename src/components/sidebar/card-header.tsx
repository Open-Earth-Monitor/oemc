import Link from 'next/link';

import cn from '@/lib/classnames';

type CardHeaderProps = {
  theme: string;
  title: string;
  color: string;
  id: string;
  type: 'monitor' | 'geostory';
  className?: string;
  loading?: boolean;
};

const CardHeader: React.FC<CardHeaderProps> = ({ theme, title, color, id, type, className }) => {
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
        href={`/explore/${type === 'monitor' ? 'monitor' : 'geostory'}/${id}${
          type === 'monitor' ? '/datasets' : ''
        }`}
      >
        <h2 style={{ color }} className="text-[22px]">
          {title}
        </h2>
      </Link>
    </div>
  );
};

export default CardHeader;
