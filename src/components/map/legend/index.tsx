import { useState, useEffect, useCallback, createRef, useLayoutEffect } from 'react';

import { HiCalendarDays, HiArrowLeftOnRectangle } from 'react-icons/hi2';
import { LuGitCompare } from 'react-icons/lu';

import { useLayerParsedSource, useLayer } from '@/hooks/layers';
import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import TimeSeries from '@/components/timeseries';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs';

import {
  DROPDOWN_TRIGGER_STYLES,
  DROPDOWN_CONTENT_STYLES,
  DROPDOWN_ITEM_STYLES,
} from './constants';
import OpacitySetting from './opacity';
import RemoveLayer from './remove';
import LayerVisibility from './visibility';

type ActiveTab = 'timeSeries' | 'comparison';

const findLabel = (value: string, range: { label: string; value: string | number }[]) =>
  range?.find((d: { label: string; value: string }) => d.value === value)?.label satisfies
    | string
    | number;

export const Legend: React.FC<{ isGeostory?: boolean }> = ({ isGeostory = false }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [compareDropdownVisibility, setCompareDropdownVisibility] = useState(false);

  const handleTabChange = (value: ActiveTab) => {
    if (value === 'comparison') {
      void setCompareLayers([
        { id: layerId, opacity, date: compareDate || range[range?.length - 1].value },
      ]);
    }
    if (value === 'timeSeries') {
      void setCompareLayers(null);
    }
    setActiveTab(value);
  };

  const layerId = layers?.[0]?.id;
  const opacity = layers?.[0]?.opacity;
  const compareDate = compareLayers?.[0]?.date;
  const { data: compareLayerData } = useLayer(
    { layer_id: compareLayers?.[0]?.id },
    { enabled: !!compareLayers }
  );

  const [activeTab, setActiveTab] = useState<ActiveTab>(
    !!compareDate || isGeostory ? 'comparison' : 'timeSeries'
  );

  const { data: layerData } = useLayer({
    layer_id: layerId,
  });

  const { data } = useLayerParsedSource({ layer_id: layerId }, { enabled: !!layers?.length });
  const { title, range } = data ?? {};

  const handleBaseDate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      void setLayers([{ id: layerId, opacity, date: e.currentTarget.value }]);
      setDropdownVisibility(false);
    },
    [layerId, opacity, setLayers]
  );

  const lastDateValue = range && range?.[range?.length - 1]?.value;

  useEffect(() => {
    if (activeTab === 'comparison' && !compareDate && !isGeostory) {
      setActiveTab('timeSeries');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareDate]);

  // Enable compare legend if compare layer is in the URL
  useEffect(() => {
    if (compareLayers) {
      setActiveTab('comparison');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeTab === 'comparison' && !compareLayerData && !isGeostory) {
      void setCompareLayers([
        {
          id: layerId,
          opacity,
          date: compareDate || lastDateValue,
        },
      ]);
    }
  }, [
    setCompareLayers,
    compareLayerData,
    opacity,
    compareDate,
    lastDateValue,
    layerId,
    activeTab,
    isGeostory,
  ]);

  const handleCompareDate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      void setCompareLayers([{ id: layerId, opacity, date: e.currentTarget.value }]);
      setCompareDropdownVisibility(false);
    },
    [layerId, opacity, setCompareLayers]
  );
  const [legendWidth, setLegendWith] = useState<number>(0);

  const titleRef = createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (titleRef && titleRef.current) {
      const width = titleRef.current.clientWidth > 294 ? 294 : titleRef.current.clientWidth;
      setLegendWith(width);
    }
  }, [titleRef, setLegendWith]);
  const baseDateLabel = findLabel(layers?.[0]?.date, range);
  const CompareDateLabel = findLabel(compareLayers?.[0]?.date, range);

  return (
    <div
      className="absolute bottom-3 right-3 z-[55] max-w-[294px] space-y-1 font-inter text-xs"
      data-testid="map-legend"
    >
      <Collapsible defaultOpen>
        <CollapsibleTrigger>
          <div
            data-testid="map-legend-toggle-button"
            className="font-inter text-xs font-medium uppercase tracking-widest"
          >
            Legend
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div
            className="flex w-full flex-col space-y-4 rounded-b-sm border-gray-600 bg-brand-500 p-4"
            style={{ minWidth: legendWidth }}
          >
            <div
              className="relative flex items-center justify-between space-x-4 text-secondary-500"
              data-testid="map-legend-item"
            >
              <div data-testid="map-legend-item-title" className="text-xs font-bold" ref={titleRef}>
                {title}
              </div>
              <div
                className="flex space-x-2 divide-x divide-secondary-800"
                data-testid="map-legend-item-toolbar"
              >
                <div className="flex space-x-2">
                  <OpacitySetting />
                  {!isGeostory && <LayerVisibility />}
                </div>
                {!isGeostory && <RemoveLayer className="pl-2" />}
              </div>
            </div>
            <ScrollArea className="max-h-[216px]">
              {layerData?.gs_style && layerData?.gs_style.length > 8 && (
                <div className="flex flex-col space-y-1 p-2">
                  <div className="to-black-500 via-black-500 absolute left-0 right-0 top-0 h-10 bg-gradient-to-t from-transparent" />

                  {layerData?.gs_style.map(({ color, label }) => (
                    <div
                      key={label}
                      className="flex items-baseline space-x-2"
                      data-testid="dataset-legend-item"
                    >
                      <div
                        className="h-2 w-2"
                        style={{
                          backgroundColor: color,
                        }}
                      />
                      <div className="text-left text-xs opacity-50">{label}</div>
                    </div>
                  ))}
                  <div className="from-black-500 absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t via-transparent to-transparent" />
                </div>
              )}

              {layerData?.gs_style && layerData?.gs_style.length <= 8 && (
                <div className="flex">
                  {layerData?.gs_style?.map(({ color, label }) => (
                    <div key={label} className="grow space-y-2" data-testid="dataset-legend-item">
                      <div
                        className="h-2 w-full"
                        style={{
                          backgroundColor: color,
                        }}
                      />
                      <div className="text-center text-xs opacity-50">{label}</div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            {isGeostory && range?.length > 0 && (
              <TimeSeries
                range={range}
                layerId={layerId}
                autoPlay={true}
                isActive={true}
                defaultActive={true}
              />
            )}

            {!isGeostory && (
              <Tabs value={activeTab} onValueChange={handleTabChange} className="pt-2">
                <TabsList>
                  <TabsTrigger value="timeSeries">
                    <div className="flex items-center space-x-2 font-bold">
                      <HiCalendarDays className="h-[19px] w-[19px]" />
                      <span>Timeline</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="comparison" disabled={!range || range.length < 1}>
                    <div className="flex items-center space-x-2">
                      <LuGitCompare className="h-[19px] w-[19px]" />
                      <span>Comparison</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="timeSeries">
                  {range?.length > 0 && (
                    <TimeSeries
                      range={range}
                      layerId={layerId}
                      autoPlay={false}
                      isActive={true}
                      defaultActive={false}
                    />
                  )}
                </TabsContent>
                <TabsContent value="comparison">
                  <div className="flex w-full flex-col items-start">
                    <div className=" divide-y divide-dashed">
                      <DropdownMenu open={dropdownVisibility}>
                        <DropdownMenuTrigger className={DROPDOWN_TRIGGER_STYLES} asChild>
                          <button
                            type="button"
                            onClick={() => setDropdownVisibility(!dropdownVisibility)}
                            className="flex w-full space-x-2 whitespace-nowrap"
                          >
                            <HiArrowLeftOnRectangle className="h-full w-4" />
                            <span>Selected year: {baseDateLabel}</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          alignOffset={0}
                          sideOffset={0}
                          className={DROPDOWN_CONTENT_STYLES}
                        >
                          <ScrollArea className="max-h-[200px] w-full">
                            {range?.map((d) => (
                              <DropdownMenuItem key={d.value} className={DROPDOWN_ITEM_STYLES}>
                                <button
                                  type="button"
                                  value={d.value}
                                  onClick={handleBaseDate}
                                  className="rounded-sm px-2.5 py-1 hover:bg-secondary-900"
                                >
                                  {d.label}
                                </button>
                              </DropdownMenuItem>
                            ))}
                          </ScrollArea>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {isGeostory ? (
                        <div className={DROPDOWN_TRIGGER_STYLES}>{compareLayerData?.title}</div>
                      ) : (
                        <DropdownMenu open={compareDropdownVisibility}>
                          <DropdownMenuTrigger className={DROPDOWN_TRIGGER_STYLES} asChild>
                            <button
                              type="button"
                              onClick={() =>
                                setCompareDropdownVisibility(!compareDropdownVisibility)
                              }
                              className="flex w-full space-x-2 whitespace-nowrap"
                            >
                              <HiArrowLeftOnRectangle className="h-full w-4 rotate-180" />

                              <span>Selected year: {CompareDateLabel}</span>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            alignOffset={0}
                            sideOffset={0}
                            className={DROPDOWN_CONTENT_STYLES}
                          >
                            <ScrollArea className="max-h-[200px] w-full">
                              {range?.map((d) => (
                                <DropdownMenuItem key={d.value} className={DROPDOWN_ITEM_STYLES}>
                                  <button
                                    type="button"
                                    value={d.value}
                                    onClick={handleCompareDate}
                                    className="rounded-sm px-2.5 py-1 hover:bg-secondary-900"
                                  >
                                    {d.label}
                                  </button>
                                </DropdownMenuItem>
                              ))}
                            </ScrollArea>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
            {isGeostory && compareLayers && (
              <div
                className="flex w-full flex-col space-y-4 rounded-b-sm border-gray-600 bg-brand-500"
                style={{ minWidth: legendWidth }}
              >
                <div
                  className="relative flex items-center justify-between space-x-4 text-secondary-500"
                  data-testid="map-legend-item"
                >
                  <div
                    data-testid="map-legend-item-title"
                    className="text-xs font-bold"
                    ref={titleRef}
                  >
                    {title}
                  </div>
                  <div
                    className="flex space-x-2 divide-x divide-secondary-800"
                    data-testid="map-legend-item-toolbar"
                  >
                    <div className="flex space-x-2">
                      <OpacitySetting />
                      {!isGeostory && <LayerVisibility />}
                    </div>
                    {!isGeostory && <RemoveLayer className="pl-2" />}
                  </div>
                </div>

                <ScrollArea className="max-h-[216px]">
                  {compareLayerData?.gs_style && compareLayerData?.gs_style.length > 8 && (
                    <div className="flex flex-col space-y-1 p-2">
                      <div className="to-black-500 via-black-500 absolute left-0 right-0 top-0 h-10 bg-gradient-to-t from-transparent" />

                      {compareLayerData?.gs_style.map(({ color, label }) => (
                        <div
                          key={label}
                          className="flex items-baseline space-x-2"
                          data-testid="dataset-legend-item"
                        >
                          <div
                            className="h-2 w-2"
                            style={{
                              backgroundColor: color,
                            }}
                          />
                          <div className="text-left text-xs opacity-50">{label}</div>
                        </div>
                      ))}
                      <div className="from-black-500 absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t via-transparent to-transparent" />
                    </div>
                  )}

                  {compareLayerData?.gs_style && compareLayerData?.gs_style.length <= 8 && (
                    <div className="flex">
                      {compareLayerData?.gs_style.map(({ color, label }) => (
                        <div
                          key={label}
                          className="grow space-y-2"
                          data-testid="dataset-legend-item"
                        >
                          <div
                            className="h-2 w-full"
                            style={{
                              backgroundColor: color,
                            }}
                          />
                          <div className="text-center text-xs opacity-50">{label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                {/* {range?.length > 0 && (
                  <TimeSeries
                    type="legend"
                    range={range}
                    layerId={layerId}
                    autoPlay={true}
                    isActive={true}
                    defaultActive={true}
                  />
                )} */}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Legend;
