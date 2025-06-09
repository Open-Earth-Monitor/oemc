import { useMemo } from 'react';

import CardHeader from '@/components/sidebar/card-header';

import { getValidPublications } from '@/utils/geostories';

function DatasetCardGeostory({ showMore, theme, title, color, publications, id }) {
  const validPublications = useMemo(() => getValidPublications(publications), [publications]);
  return (
    <div className="space-y-2.5 divide-y divide-white-900">
      <CardHeader theme={theme} title={title} type="geostory" color={color} id={id} />

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
