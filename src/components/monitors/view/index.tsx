import { FC, useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { LayerParsed } from '@/types/layers';
import { Monitor } from '@/types/monitors';

import DatasetCard from '@/components/datasets/card';
import MonitorDialog from '@/components/monitors/dialog';
import DatasetCardGeostory from '@/components/sidebar/card-geostory-content';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface MonitorViewProps {
  data: Monitor & {
    monitor_bbox: number[];
    color: string;
  };
  geostoryLayers: LayerParsed[];
}

const MonitorView: FC<MonitorViewProps> = ({ data, geostoryLayers }) => {
  const [datasetStatus, setDatasetStatus] = useState<'open' | 'closed'>('open');
  const [geostoryStatus, setGeostoryStatus] = useState<'open' | 'closed'>('open');
  const { color, description, geostories } = data || {};

  return (
    <>
      <div className="relative space-y-6 py-3">
        <p>{description}</p>
        <div className="space-y-4">
          <MonitorDialog {...data} />
        </div>
      </div>
      {/* Datasets/layers cards */}
      {!!geostoryLayers?.length ? (
        <Collapsible
          defaultOpen={true}
          onOpenChange={(open) => setDatasetStatus(open ? 'open' : 'closed')}
        >
          <div className="flex w-full items-center justify-between">
            <h2 className="py-2 font-medium">Datasets</h2>
            <CollapsibleTrigger asChild data-testid="collapse-datasets-button">
              <Button
                variant={datasetStatus === 'open' ? 'outline' : 'default'}
                size="sm"
                className="flex w-fit items-center gap-1 rounded-full"
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
                      isGeostory={false}
                      color={color}
                    />
                  </li>
                );
              })}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <p>No layers available for this monitor.</p>
      )}
      {/* Geostories cards */}
      {!!geostories?.length && (
        <Collapsible
          defaultOpen={true}
          onOpenChange={(open) => setGeostoryStatus(open ? 'open' : 'closed')}
        >
          <div className="flex w-full items-center justify-between">
            <h2 className="py-2 font-medium">Geostories</h2>
            <CollapsibleTrigger asChild data-testid="collapse-geostories-button">
              <Button
                variant={geostoryStatus === 'open' ? 'outline' : 'default'}
                size="sm"
                className="flex w-fit items-center gap-1 rounded-full"
              >
                {geostoryStatus === 'open' ? 'Collapse' : 'Expand'}
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform', {
                    'rotate-180': geostoryStatus === 'open',
                  })}
                  aria-hidden="true"
                />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pt-4 transition-all duration-500 ease-in-out data-[state=closed]:-translate-y-2 data-[state=open]:translate-y-0 data-[state=closed]:opacity-0 data-[state=open]:opacity-100">
            <ul className="space-y-4 sm:space-y-6" data-testid="geostories-list">
              {geostories?.map((geostory) => {
                return (
                  <li key={geostory?.id}>
                    <DatasetCardGeostory {...geostory} color={color} />
                  </li>
                );
              })}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}
    </>
  );
};

export default MonitorView;
