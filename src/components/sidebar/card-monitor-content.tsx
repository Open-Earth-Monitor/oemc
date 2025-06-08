import Link from 'next/link';

function DatasetCardMonitor({ showMore, theme, title, geostories, color, id }) {
  console.log({ geostories });
  return (
    <div className="space-y-2.5 divide-y divide-white-900">
      <div className="space-y-4 font-medium">
        <div className="flex items-center space-x-5 divide-x divide-white-900">
          <span>Monitor</span>
          <span className="pl-5" style={{ color: color }}>
            {theme}
          </span>
        </div>
        <Link href={`/explore/map/monitor/${id}/datasets`}>
          <h2 style={{ color: color }} className="text-[22px]">
            {title}
          </h2>
        </Link>
      </div>
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
