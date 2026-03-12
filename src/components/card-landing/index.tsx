import type { FC, PropsWithChildren } from 'react';

import { LuArrowRight, LuRefreshCcw } from 'react-icons/lu';

import type { Geostory } from '@/types/geostories';

import { TAG_STYLE } from '@/styles/constants';

type CardType = 'geostory' | 'monitor';
type GeostoryTheme = Geostory['theme'];
type GeostoryReady = Geostory['ready'];
type GeostoryId = Geostory['id'];
type GeostoryTitle = Geostory['title'];

type CardHeaderProps = {
  type: CardType;
  color?: string;
  theme?: GeostoryTheme;
  ready?: GeostoryReady;
  id?: GeostoryId;
  title?: GeostoryTitle;
};

type CardFooterProps = PropsWithChildren<{
  id?: GeostoryId;
}>;

type DatasetCardProps = PropsWithChildren<{
  type: CardType;
  ready?: GeostoryReady;
}>;

export const CardHeader: FC<CardHeaderProps> = ({ type, color, theme, ready, id, title }) => {
  const displayColor = ready ? color ?? '#000' : '#000';
  const displayTheme = theme.label;

  return (
    <div className="space-y-3">
      <div data-testid={`card-type-${id}`} className={TAG_STYLE}>
        <span>{type}</span> |{' '}
        <span className="capitalize" style={{ color: displayColor }}>
          #{displayTheme}
        </span>
      </div>
      <h2
        data-testid={`card-title-${id}`}
        className="font-satoshi text-2xl font-bold group-hover:underline"
        style={{ color: displayColor }}
      >
        {title}
      </h2>
    </div>
  );
};

export const CardFooter: FC<CardFooterProps> = ({ id, children }) => {
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

export const DatasetCard: FC<DatasetCardProps> = ({ type, ready, children }) => {
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
