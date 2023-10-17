import { FC } from 'react';

import Link from 'next/link';

import cn from '@/lib/classnames';

import { Geostory } from '@/types/geostories';
import { Monitor } from '@/types/monitors';

import CardGeostory from '@/components/landing-card/geostories';
import CardMonitor from '@/components/landing-card/monitors';

const Card: FC<Geostory & { data: Monitor[] | Geostory[] }> = ({ title, id, ...data }) => {
  const isMonitor = id.startsWith('m');
  const isGeostory = id.startsWith('g');
  return (
    <div className="font-inter text-brand-500">
      {isMonitor && <CardMonitor title={title} id={id} {...data} />}
      {isGeostory && <CardGeostory title={title} id={id} {...data} />}
    </div>
  );
};

export default Card;
