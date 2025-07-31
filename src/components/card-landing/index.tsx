import { FC, PropsWithChildren } from 'react';

import { LuRefreshCcw, LuArrowRight } from 'react-icons/lu';

import { Geostory } from '@/types/geostories';

import { TAG_STYLE } from '@/styles/constants';

type CardHeaderProps = {
  type: 'geostory' | 'monitor';
  color?: string;
  theme: Geostory['theme'];
  ready: Geostory['ready'];
  id: Geostory['id'];
  title: Geostory['title'];
};

type CardFooterProps = {
  id: Geostory['id'];
};

type DatasetCardProps = PropsWithChildren<{
  type: CardHeaderProps['type'];
  ready: Geostory['ready'];
}>;

export const CardHeader: FC<Partial<CardHeaderProps>> = ({
  type,
  color,
  theme,
  ready,
  id,
  title,
}) => {
  return (
    <div className="space-y-3">
      <div data-testid={`card-type-${id}`} className={TAG_STYLE}>
        <span>{type}</span> |{' '}
        <span className="capitalize" style={{ color: ready ? color : '#000' }}>
          #{theme || 'Unknown'}
        </span>
      </div>
      <h2
        data-testid={`card-title-${id}`}
        className="font-satoshi text-2xl font-bold group-hover:underline"
        style={{ color: ready ? color : '#000' }}
      >
        {title}
      </h2>
    </div>
  );
};

export const CardFooter: FC<PropsWithChildren<CardFooterProps>> = ({ id, children }) => {
  return (
    <div className="flex items-center justify-between">
      {children}
      <div
        className="rounded-full bg-white-950 p-2 group-hover:bg-white-500 group-hover:text-black-500"
        data-testid={`card-${id}`}
      >
        <LuArrowRight className="h-6 w-6" />
      </div>
    </div>
  );
};

export const DatasetCard: FC<Partial<DatasetCardProps>> = ({ type, ready, children }) => {
  return (
    <div className="flex h-full flex-1 flex-col justify-between space-y-11 p-7">
      {ready ? (
        children
      ) : (
        <div>
          <div className="bg-black/10 float-left flex items-center space-x-2 rounded-md px-3 py-2 leading-none">
            <LuRefreshCcw className="h-5 w-5" />
            <span className="text-xs font-bold">
              {type === 'geostory' ? 'Geostory' : 'Monitor'} under-development
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetCard;
