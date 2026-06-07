import { FC, useState } from 'react';

import Link from 'next/link';

import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { Geostory } from '@/types/geostories';
import { LayerParsed, Layer } from '@/types/layers';

import DatasetCard from '@/components/datasets/card';
import DatasetCardMonitor from '@/components/sidebar/card-monitor-content';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import GeostoryDialog from '../dialog';

interface GeostoriesViewProps {
  data: Geostory & {
    geostory_bbox: number[];
    color: string;
    layers: LayerParsed[] | Layer[];
  };
  geostoryLayers: LayerParsed[];
  comparisonLayer?: LayerParsed | null;
}
const GeostoriesView: FC<GeostoriesViewProps> = ({ data, geostoryLayers, comparisonLayer }) => {
  const [datasetStatus, setStatus] = useState<'open' | 'closed'>('open');
  const [monitorStatus, setMonitorStatus] = useState<'open' | 'closed'>('open');
  const { color, description, monitors } = data || {};

  const handleDatasetsToggle = () => {
    setStatus((prevStatus) => (prevStatus === 'open' ? 'closed' : 'open'));
  };

  return (
    <div className="space-y-6 py-3">
      <div className="relative space-y-6 py-3">
        <p className="text-sm font-medium text-white-50" data-testid="geostory-description">
          {description}
        </p>
        <div className="flex w-full justify-end space-y-4">
          <GeostoryDialog {...data} />
        </div>
      </div>
      {/* Datasets/layers cards */}
      {!!geostoryLayers?.length ? (
        <Collapsible defaultOpen={true} onOpenChange={handleDatasetsToggle}>
          <div className="0 flex w-full items-center justify-between">
            <h2 className="py-2 font-medium">Datasets</h2>

            <CollapsibleTrigger
              className="w-fit p-0 data-[state=open]:bg-transparent"
              data-testid="collapse-button"
            >
              <Button
                variant={datasetStatus === 'open' ? 'outline' : 'default'}
                size="sm"
                className="flex items-center gap-1"
              >
                {datasetStatus === 'open' ? 'Collapse' : 'Expand'}
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform', {
                    'rotate-180': datasetStatus === 'open',
                  })}
                  aria-hidden="true"
                />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pt-4 transition-all duration-500 ease-in-out data-[state=closed]:-translate-y-2 data-[state=open]:translate-y-0 data-[state=closed]:opacity-0 data-[state=open]:opacity-100">
            <ul className="space-y-4 sm:space-y-6" data-testid="datasets-list">
              {geostoryLayers?.map((dataset) => {
                return (
                  <li key={dataset?.layer_id}>
                    <DatasetCard
                      {...dataset}
                      id={dataset?.layer_id}
                      isGeostory={true}
                      color={color}
                      comparisonLayer={comparisonLayer}
                    />
                  </li>
                );
              })}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <p>No layers available for this geostory.</p>
      )}
      {/* Monitors list */}
      {!!monitors?.length && (
        <Collapsible
          defaultOpen={true}
          onOpenChange={(open) => setMonitorStatus(open ? 'open' : 'closed')}
        >
          <div className="flex w-full items-center justify-between">
            <h2 className="font-medium">Monitors</h2>
            <CollapsibleTrigger
              className="w-fit p-0 data-[state=open]:bg-transparent"
              data-testid="collapse-monitors-button"
            >
              <Button
                variant={monitorStatus === 'open' ? 'outline' : 'default'}
                size="sm"
                className="flex items-center gap-1"
              >
                {monitorStatus === 'open' ? 'Collapse' : 'Expand'}
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform', {
                    'rotate-180': monitorStatus === 'open',
                  })}
                  aria-hidden="true"
                />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pt-4 transition-all duration-500 ease-in-out data-[state=closed]:-translate-y-2 data-[state=open]:translate-y-0 data-[state=closed]:opacity-0 data-[state=open]:opacity-100">
            <ul className="space-y-2.5">
              {monitors.map((monitor) => (
                <li key={monitor.id} className="text-xs font-bold underline">
                  <Link
                    href={`/explore/monitor/${monitor.id}`}
                    data-testid={`monitor-link-${monitor.id}`}
                  >
                    <DatasetCardMonitor {...monitor} color={color} />
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default GeostoriesView;
