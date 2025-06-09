import Link from 'next/link';

import CardHeader from '@/components/sidebar/card-header';

function DatasetCardMonitor({ showMore, theme, title, geostories, color, id }) {
  return (
    <div className="space-y-2.5 divide-y divide-white-900">
      <CardHeader theme={theme} title={title} type="monitor" color={color} id={id} />
      {!showMore && geostories.length && (
        <div className="space-y-4 pt-1 text-xs">
          <p>geostories</p>
          <ul className="space-y-2.5">
            {geostories.map((geostory) => (
              <li key={geostory.id} className="font-bold underline">
                <Link href={`/explore/map/geostories/${geostory.id}`}>{geostory.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DatasetCardMonitor;
