import { FC } from 'react';

type ItemProps = {
  title: string;
  theme: string;
  color: string;
  type: 'monitor' | 'geostory';
};
const WebTrafficRankingContentItem: FC<ItemProps> = ({ title, theme, color, type }: ItemProps) => {
  return (
    <li key={title} className="flex h-full space-x-4">
      <span style={{ backgroundColor: color }} className="flex w-1 flex-shrink-0" />

      <div>
        <div className="flex items-start space-x-6">
          <span className="inline-flex text-xs capitalize">{type}</span>
          <span className="inline-flex text-xs" style={{ color }}>
            {theme}
          </span>
        </div>
        <p className="text-2xl font-bold" style={{ color }}>
          {title}
        </p>
      </div>
    </li>
  );
};

export default WebTrafficRankingContentItem;
