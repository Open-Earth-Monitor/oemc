import { useState, useEffect, useCallback } from 'react';
import { MouseEvent } from 'react';

import { cn } from '@/lib/classnames';

import { useLayerParsedSource } from '@/hooks/layers';
import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import OpacitySetting from './opacity';
import RemoveLayer from './remove';
import LayerVisibility from './visibility';

const LEGEND_BUTTON_STYLES =
  'bg-brand-500 flex-1 text-center text-xs uppercase rounded font-medium grow px-2 h-[34px] py-1 tracking-wide text-white hover:bg-secondary-500 hover:text-brand-500 disabled:opacity-50 disabled:cursor-not-allowed';

const findLabel = (value: string, range: { label: string; value: string | number }[]) =>
  range?.find((d: { label: string; value: string }) => d.value === value)?.label satisfies
    | string
    | number;

export const Legend = () => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const layerId = layers?.[0]?.id;
  const opacity = layers?.[0]?.opacity;

  const compareDate = compareLayers?.[0]?.date;

  const { data } = useLayerParsedSource({ layer_id: layerId }, { enabled: !!layers?.length });
  const { title, range } = data ?? {};

  const [activeTab, setActiveTab] = useState<'layer-settings' | 'compare-layers'>(
    !!compareDate ? 'compare-layers' : 'layer-settings'
  );

  const handleTabChange = (value: 'layer-settings' | 'compare-layers') => {
    setActiveTab(value);
  };

  const baseDateLabel = findLabel(layers?.[0]?.date, range);
  const CompareDateLabel = findLabel(compareLayers?.[0]?.date, range);

  const handleBaseDate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      void setLayers([{ id: layerId, opacity, date: e.currentTarget.value }]);
    },
    [layerId, opacity, setLayers]
  );

  const handleCompareDate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      void setCompareLayers([{ id: layerId, opacity, date: e.currentTarget.value }]);
    },
    [layerId, opacity, setCompareLayers]
  );

  // needed to set the compare date to the base date when the user clicks on the compare tab
  useEffect(() => {
    if (activeTab === 'compare-layers') {
      void setCompareLayers([{ id: layerId, opacity, date: compareDate || layers?.[0]?.date }]);
    }
    if (activeTab === 'layer-settings') {
      void setCompareLayers(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div
      className="absolute bottom-3 right-3 z-10 space-y-1 font-inter text-xs"
      data-testid="map-legend"
    >
      <Tabs value={activeTab} onValueChange={handleTabChange} className="min-w-[270px]">
        <TabsList className="border-box rounded border border-secondary-500">
          <TabsTrigger
            data-testid="map-legend-toggle-button"
            value="layer-settings"
            className={cn(LEGEND_BUTTON_STYLES)}
          >
            Layer
          </TabsTrigger>
          <TabsTrigger
            value="compare-layers"
            className={cn(LEGEND_BUTTON_STYLES)}
            data-testid="map-legend-compare-button"
            disabled={!range || range.length === 0 || !layerId}
          >
            Compare
          </TabsTrigger>
        </TabsList>
        <TabsContent value="layer-settings">
          <div
            className="relative flex min-h-[34px] items-start justify-between space-x-4 rounded-sm border border-gray-600 bg-brand-500 px-4 py-3 text-secondary-500"
            data-testid="map-legend-item"
          >
            <div data-testid="map-legend-item-title" className="text-xs font-bold">
              {title}
            </div>
            <div
              className="flex space-x-2 divide-x divide-secondary-900"
              data-testid="map-legend-item-toolbar"
            >
              <div className="flex space-x-2">
                <OpacitySetting />
                <LayerVisibility />
              </div>
              <RemoveLayer className="pl-2" />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="compare-layers" className="ml-0">
          <div
            className={cn(
              'relative flex min-h-[34px] w-full flex-col justify-between space-y-6 rounded-sm border border-gray-600 bg-brand-500 px-4 py-3 text-secondary-500'
            )}
            data-testid="map-legend-item"
          >
            <div data-testid="map-legend-item-title" className="text-xs font-bold">
              {title}
            </div>

            <div className="flex w-full flex-col items-start space-y-6 ">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full border-none p-0">
                  <div className="flex w-full justify-between">
                    <span>Selected year: {baseDateLabel}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-brand-500">
                  {range?.map((d) => (
                    <DropdownMenuItem key={d.value}>
                      <button
                        type="button"
                        value={d.value}
                        onClick={handleBaseDate}
                        className="w-full"
                      >
                        {d.label}
                      </button>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full border-none p-0">
                  <div className="flex w-full justify-between">
                    <span>Selected year: {CompareDateLabel}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-[100px] bg-brand-500">
                  {range?.map((d) => (
                    <DropdownMenuItem key={d.value}>
                      <button
                        type="button"
                        value={d.value}
                        onClick={handleCompareDate}
                        className="w-full"
                      >
                        {d.label}
                      </button>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Legend;
