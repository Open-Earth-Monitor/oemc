import { FC, useState } from 'react';

import Link from 'next/link';

import { Geostory } from '@/types/geostories';
import { LayerParsed, Layer } from '@/types/layers';

import DatasetCard from '@/components/datasets/card';
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
  const { color, description, monitors } = data || {};

  const handleDatasetsToggle = () => {
    setStatus((prevStatus) => (prevStatus === 'open' ? 'closed' : 'open'));
  };

  return (
    <>
      <div className="relative space-y-6 py-3">
        <p className="text-sm font-medium text-white-50">{description}</p>
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
              <Button variant={datasetStatus === 'open' ? 'outline' : 'default'} size="sm">
                {datasetStatus === 'open' ? 'Collapse' : 'Expand'}
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
        <div className="space-y-4 pt-1 text-xs">
          <p>Monitors</p>
          <ul className="space-y-2.5">
            {monitors.map((monitor) => (
              <li key={monitor.id} className="font-bold underline">
                <Link
                  href={`/explore/monitor/${monitor.id}`}
                  data-testid={`monitor-link-${monitor.id}`}
                >
                  {monitor.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default GeostoriesView;
