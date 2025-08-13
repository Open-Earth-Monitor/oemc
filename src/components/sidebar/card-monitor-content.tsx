import Link from 'next/link';

import CardHeader from '@/components/sidebar/card-header';

function DatasetCardMonitor({ showMore, theme, title, geostories, color, id, monitor_bbox }) {
  return (
    <div className="space-y-2.5 divide-y divide-white-900 font-satoshi">
      <CardHeader
        theme={theme}
        title={title}
        type="monitor"
        color={color}
        id={id}
        bbox={monitor_bbox}
      />
      {!showMore && !!geostories.length && (
        <div className="space-y-4 pt-1 text-xs">
          <p>Geostories</p>
          <ul className="space-y-2.5">
            {geostories.map((geostory) => (
              <li key={geostory.id} className="font-bold underline">
                <Link
                  href={`/explore/geostory/${geostory.id}${
                    geostory.geostory_bbox ? `?bbox=${geostory.geostory_bbox.join(',')}` : ''
                  }`}
                >
                  {geostory.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DatasetCardMonitor;
