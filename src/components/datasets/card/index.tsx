'use client';

import { FC, useCallback, useMemo } from 'react';

import { HiOutlineExternalLink } from 'react-icons/hi';
import { LuLayers } from 'react-icons/lu';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

import cn from '@/lib/classnames';
import { isValidUrl } from '@/lib/url';

import type { LayerParsed } from '@/types/layers';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import { useSyncCompareLayersSettings, useSyncLayersSettings } from '../../../hooks/sync-query';
import { Monitor } from '@/types/monitors';
import { Geostory } from '@/types/geostories';

type DatasetCardProps = LayerParsed & {
  id: string;
  active?: boolean;
  type?: 'monitor' | 'geostory';
  isGeostory?: boolean;
  use_case_link?: Monitor['use_case_link'] | Geostory['use_case_link'];
};

const DatasetCard: FC<DatasetCardProps> = ({
  id,
  title,
  download_url,
  description,
  range,
  isGeostory = false,
  data_meaning,
  value_society,
  usage_examples,
}) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  // isActive is based on the url
  const isActive = useMemo(() => layers?.[0]?.id === id, [id, layers]);
  const isCompareActive = useMemo(() => compareLayers?.[1]?.id === id, [id, compareLayers]);

  /**
   * Handle click on the toggle button
   */
  const handleToggleLayer = useCallback(() => {
    if (!isActive) {
      void setLayers([
        {
          id,
          opacity: layers?.[0]?.opacity || 1,
          date: range?.[0]?.value,
        },
      ]);
      if (!isGeostory && range.length <= 1) void setCompareLayers(null);
      if (!isGeostory && range.length > 1 && isCompareActive) {
        void setCompareLayers([
          {
            id,
            opacity: layers?.[0]?.opacity || 1,
            date: range[range?.length - 1].value,
          },
        ]);
      }
    } else {
      void setLayers(null);
      void setCompareLayers(null);
    }
  }, [id, isActive, isCompareActive, isGeostory, layers, range, setCompareLayers, setLayers]);

  const isValidUrlDownload = isValidUrl(download_url);
  return (
    <div className="space-y-4 bg-brand-300 p-6 sm:space-y-4" data-testid={`dataset-item-${id}`}>
      <div className="flex flex-col items-start space-y-2">
        <h2
          data-testid="dataset-title"
          className="font-satoshi text-2xl font-bold text-secondary-500"
        >
          {title}
        </h2>

        {/* <Dialog>
          <DialogTrigger
            data-testid="disclaimer-data-interpretation"
            className="font-inter text-xs font-bold uppercase text-secondary-500 underline"
          >
            Data interpretation
          </DialogTrigger>
          <DialogContent
            data-testid={`monitor-card-${id}`}
            className="w-full bg-secondary-500 text-brand-500 sm:w-[665px]"
          >
            <DialogHeader className="space-y-6">
              <DialogTitle asChild>
                <header className="space-y-6 py-6 sm:py-0">
                  <h2
                    data-testid="monitor-title"
                    className="inline-block pr-6 text-2xl font-bold sm:text-5xl"
                  >
                    {title}
                  </h2>
                  <div
                    data-testid="monitor-description"
                    className="font-inter flex flex-wrap leading-[25px]"
                  >
                    {description}
                  </div>
                </header>
              </DialogTitle>
              <DialogDescription asChild>
                <div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <h3 className="flex items-center space-x-2">
                          <HiOutlineGlobeAlt className="h-6 w-6" />
                          <span className="text-2xl font-bold">Real life impact</span>
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent>
                        {data_meaning && <p>{data_meaning}</p>}
                        {!data_meaning && (
                          <i>
                            Coming Soon: Info about what the numbers tell us for each dataset,
                            providing insights into the specific values and conditions they
                            represent.
                          </i>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        <h3 className="flex items-center space-x-2">
                          <HiOutlineGlobeAlt className="h-6 w-6" />
                          <span className="text-2xl font-bold">Examples</span>
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent>
                        {usage_examples && <p>{usage_examples}</p>}
                        {!usage_examples && (
                          <i>
                            Coming Soon: Info about what these datasets are used for and who
                            benefits from them.
                          </i>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        <h3 className="flex items-center space-x-2">
                          <HiOutlineGlobeAlt className="h-6 w-6" />
                          <span className="text-2xl font-bold">Value to society</span>
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent>
                        {value_society && <p>{value_society}</p>}
                        {!value_society && (
                          <i>
                            Coming Soon: Info about why these datasets are valuable to society and
                            how they contribute to informed decision-making, improved policies, and
                            a better understanding of key issues.
                          </i>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <DialogClose className="right-10 top-10 flex h-4 items-center space-x-2 text-xs font-medium uppercase tracking-[0.96px] text-brand-500">
                    Close
                  </DialogClose>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
      </div>

      <p data-testid="dataset-description" className="text-secondary-500">
        {description}
      </p>
      <div className="mt-1.5 flex items-baseline space-x-2">
        {!!download_url && isValidUrlDownload && (
          <a
            href={download_url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="dataset-download-button"
            title="Go to download dataset site"
          >
            <HiOutlineExternalLink className="h-6 w-6 text-secondary-500" />
          </a>
        )}
      </div>

      {!isGeostory && (
        <div>
          <Button
            data-testid="dataset-layer-toggle-button"
            type="button"
            variant={isActive ? 'gradient' : 'default'}
            onClick={handleToggleLayer}
            className="flex w-full items-center space-x-2"
          >
            <span>{isActive ? 'Hide' : 'Show'} layer on the map</span>
            <LuLayers className="h-3 w-3 text-inherit" title="layer" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DatasetCard;
