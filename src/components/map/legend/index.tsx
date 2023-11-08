import { useMemo, useState, useEffect, useCallback } from 'react';
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

  const compareId = compareLayers?.[0]?.id;
  const compareDate = compareLayers?.[0]?.date;

  const { data } = useLayerParsedSource({ layer_id: layerId }, { enabled: !!layers?.length });
  const { title, range } = data ?? {};

  const defaultId = layerId ?? data?.id;
  const defaultBaseDate = layers?.[0]?.date || range?.[0]?.value;
  const defaultCompareDate = compareDate ?? layers?.[0]?.date;

  const [activeTab, setActiveTab] = useState<'layer-settings' | 'compare-layers'>(
    !!compareDate ? 'compare-layers' : 'layer-settings'
  );

  const handleTabChange = (value: 'layer-settings' | 'compare-layers') => {
    setActiveTab(value);
  };

  const [selectedBaseDate, setSelectedBaseDate] = useState<string>(defaultBaseDate);
  const [selectedCompareDate, setSelectedCompareDate] = useState<string>(defaultCompareDate);
  useEffect(() => {
    if (activeTab === 'compare-layers' && !compareLayers?.[0]?.id) {
      setCompareLayers([{ id: defaultId, opacity, date: layers?.[0]?.date || range?.[0]?.value }]);
    }
    if (activeTab === 'layer-settings') {
      setCompareLayers(null);
    }
    // setLayers([{ id: defaultId, opacity, date: layers?.[0]?.date || range?.[0]?.value }]);
  }, [defaultId, activeTab, setLayers, setCompareLayers, compareLayers, opacity, layers, range]);

  useEffect(() => {
    if (activeTab === 'compare-layers' && compareLayers?.[0]?.id) {
      setLayers([{ id: defaultId, opacity, date: selectedBaseDate }]);
      setCompareLayers([{ id: defaultId, opacity, date: selectedCompareDate }]);
    }
    // setLayers([{ id: defaultId, opacity, date: layers?.[0]?.date || range?.[0]?.value }]);
  }, [selectedBaseDate, selectedCompareDate]);

  useEffect(() => {
    if (activeTab === 'layer-settings' && layers?.[0]?.id) {
      setLayers([{ id: defaultId, opacity, date: selectedBaseDate }]);
    }
    // setLayers([{ id: defaultId, opacity, date: layers?.[0]?.date || range?.[0]?.value }]);
  }, [selectedBaseDate]);

  useEffect(() => {
    if (!compareId) {
      setActiveTab('layer-settings');
    }
  }, [compareId]);

  // useEffect(() => {
  //   if (activeTab === 'compare-layers') {
  //     setCompareLayers([{ id: defaultId, opacity, date: selectedCompareDate }]);
  //   }
  //   if (activeTab === 'layer-settings') {
  //     setCompareLayers(null);
  //   }
  //   setLayers([{ id: defaultId, opacity, date: date || range?.[0]?.value }]);
  // }, [defaultId]);
  const baseDateLabel = findLabel(layers?.[0]?.date, range);
  const CompareDateLabel = findLabel(compareLayers?.[0]?.date, range);

  return (
    <div
      className="absolute bottom-3 right-3 z-10 space-y-1 font-inter text-xs"
      data-testid="map-legend"
    >
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-[400px]">
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
            className="relative flex min-h-[34px] items-center justify-between space-x-4 rounded-sm border border-gray-600 bg-brand-500 px-4 py-3 text-secondary-500"
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
        <TabsContent value="compare-layers">
          <div
            className={cn(
              'relative flex min-h-[34px] flex-col items-center justify-between space-x-4 space-y-6 rounded-sm border border-gray-600 bg-brand-500 px-4 py-3 text-secondary-500'
            )}
            data-testid="map-legend-item"
          >
            <div data-testid="map-legend-item-title" className="text-xs font-bold">
              {title}
            </div>

            <div className="flex w-full flex-col space-y-6">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex w-full justify-between">
                    <span>Selected year: {baseDateLabel}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-brand-500">
                  {range?.map((d) => (
                    <DropdownMenuItem key={d.value}>
                      <button type="button" onClick={() => setSelectedBaseDate(d.value)}>
                        {d.label}
                      </button>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex w-full justify-between">
                    <span>Selected year: {CompareDateLabel}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-brand-500">
                  {range?.map((d) => (
                    <DropdownMenuItem key={d.value}>
                      <button type="button" onClick={() => setSelectedCompareDate(d.value)}>
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
