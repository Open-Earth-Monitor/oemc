import { FC } from 'react';

import type { Geostory } from '@/types/geostories';

import { TAG_STYLE } from '@/styles/constants';

const GeostoryHeader: FC<Geostory & { color: string }> = ({
  title,
  description,
  notebooks_url,
  color,
}) => {
  return (
    <>
      <div className="space-y-6 p-6">
        {/* TODO - get color from API when we get categories */}
        <div className={TAG_STYLE} style={{ color }}>
          geostory
        </div>
        <h1 className="font-satoshi text-4xl font-bold">{title}</h1>
        <p className="text-xl font-light">{description}</p>
      </div>
      <div className="p-6">
        <dl className="space-y-2 py-2">
          <div>
            <dt className="inline-block whitespace-nowrap font-bold">Computational notebook:</dt>
            <dd>
              {notebooks_url && (
                <a href={notebooks_url} className="inline-block break-all underline">
                  {notebooks_url}
                </a>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

export default GeostoryHeader;
