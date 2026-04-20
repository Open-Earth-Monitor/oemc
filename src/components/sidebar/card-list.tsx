import { MonitorsAndGeostoriesParsed } from '@/types/monitors-and-geostories';

import SidebarDatasetCard from '@/components/sidebar/card';
import DatasetCardGeostory from '@/components/sidebar/card-geostory-content';
import DatasetCardMonitor from '@/components/sidebar/card-monitor-content';

interface CardListProps {
  data: MonitorsAndGeostoriesParsed;
  className?: HTMLDivElement['className'];
}

export default function CardList({ data, className }: CardListProps) {
  return (
    <ul className={className}>
      {data?.map((parsed) => (
        <li key={parsed.id} className="mb-4">
          <SidebarDatasetCard {...parsed}>
            {parsed.type === 'monitor' && <DatasetCardMonitor {...parsed} mainContent={true} />}
            {parsed.type === 'geostory' && <DatasetCardGeostory {...parsed} />}
          </SidebarDatasetCard>
        </li>
      ))}
    </ul>
  );
}
