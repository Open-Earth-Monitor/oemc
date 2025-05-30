import { useMemo } from 'react';

import { getValidPublications } from '@/utils/geostories';

function DatasetCardGeostory({ showMore, theme, title, color, publications, id }) {
  const validPublications = useMemo(() => getValidPublications(publications), [publications]);
  return (
    <div className="space-y-2.5 divide-y divide-white-900">
      <div className="space-y-4 font-medium">
        <div className="flex items-center space-x-5 divide-x divide-white-900">
          <span>Geostory</span>
          <span className="pl-5" style={{ color: color }}>
            {theme}
          </span>
        </div>
        <h2 style={{ color: color }} className="text-[22px]">
          {title}
        </h2>
      </div>
      {!showMore && validPublications && !!validPublications.length && (
        <div className="space-y-4 pt-1 text-xs">
          <p>Publications</p>
          <ul className="space-y-2.5">
            {validPublications?.map((publication) => (
              <li key={publication.title} className="font-bold underline">
                {publication.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DatasetCardGeostory;
//
