import { FC } from 'react';

import CardGeostory from '@/components/landing-card/geostories';
import CardMonitor from '@/components/landing-card/monitors';

const Card: FC<{
  id: string;
  title: string;
}> = ({ title, id, ...data }) => {
  const isMonitor = id.startsWith('m');
  const isGeostory = id.startsWith('g');

  return (
    <div className="font-inter text-brand-500">
      {isMonitor && <CardMonitor id={id} title={title} {...data} />}
      {isGeostory && <CardGeostory id={id} title={title} {...data} />}
    </div>
  );
};

export default Card;
