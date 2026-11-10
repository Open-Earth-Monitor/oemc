import { FC } from 'react';

import { useParams } from 'next/navigation';

import cn from '@/lib/classnames';

import { getGeostoryImageUrl } from '@/hooks/geostories';

type GeostoryProps = {
  theme: string;
  title: string;
  color: string;
  id: string;
  className?: string;
  loading?: boolean;
  bbox?: number[];
};

const GeostoryHeader: FC<GeostoryProps> = ({ theme, title, color, id, className }) => {
  const params = useParams();
  const geostoryId = typeof params.geostory_id === 'string' ? params.geostory_id : id;

  return (
    <div
      className={cn('relative flex flex-col space-y-4 overflow-hidden p-8 font-medium', className)}
    >
      <div
        className="absolute inset-0 bg-cover bg-bottom"
        style={{
          backgroundImage: `url(${getGeostoryImageUrl(geostoryId)})`,
        }}
      />

      <div className="absolute inset-0 scale-125 bg-black-500/50" />

      <div className="relative z-10 flex items-center space-x-5 divide-x divide-white-900">
        <span>Geostory</span>
        <span className="pl-5" style={{ color }}>
          {theme}
        </span>
      </div>

      <h1
        className="relative z-10 inline-block pb-6
          text-[28px]"
      >
        {title}
      </h1>
    </div>
  );
};

export default GeostoryHeader;
