import { useState, useEffect, useCallback, createRef, useLayoutEffect } from 'react';

import cn from '@/lib/classnames';

import { useLayer, useLegendGraphic } from '@/hooks/layers';
import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import Loading from '@/components/loading';
import { ScrollArea } from '@/components/ui/scroll-area';

import LegendGraphic from './graphic';
import OpacitySetting from './opacity';
import RemoveLayer from './remove';
import LayerVisibility from './visibility';

type ActiveTab = 'timeSeries' | 'comparison';

export const Legend: React.FC<{ isGeostory?: boolean }> = ({ isGeostory = false }) => {
  const [layers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

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

  // Info for layer on the left side
  const {
    data: layerData,
    isLoading: isLoadingLayerData,
    isFetched: isFetchedLayerData,
    isError: isErrorLayerData,
  } = useLayer({
    layer_id: layerId,
  });

  // Info for layer on the right side (comparison layer)
  const {
    data: layerDataCompare,
    isLoading: isLoadingCompare,
    isError: isErrorCompare,
    isFetched: isFetchedCompare,
  } = useLayer({ layer_id: compareLayers?.[0]?.id }, { enabled: !!compareLayers });

  const {
    data: legendData,
    isError: isErrorLegendData,
    isLoading: isLoadingLegendData,
    isFetched: isFetchedLegendData,
  } = useLegendGraphic({
    gs_name: layerData?.gs_name,
    gs_base_wms: layerData?.gs_base_wms,
  });

  const { data: legendDataCompare, isError: isErrorCompareLegendData } = useLegendGraphic({
    gs_base_wms: layerDataCompare?.gs_base_wms,
    gs_name: layerDataCompare?.gs_name,
  });

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
          date: compareDate,
        },
      ]);
    }
  }, [setCompareLayers, compareLayerData, opacity, compareDate, layerId, activeTab, isGeostory]);

  const handleCompareOpacity = useCallback(
    (nexOpacity: number) => {
      void setCompareLayers((prevState) => [{ ...prevState?.[0], opacity: nexOpacity }]);
    },
    [setCompareLayers]
  );

  const [legendWidth, setLegendWith] = useState<number>(0);

  const titleRef = createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (titleRef && titleRef.current) {
      const width = titleRef.current.clientWidth > 294 ? 294 : titleRef.current.clientWidth;
      setLegendWith(width);
    }
  }, [titleRef, setLegendWith]);

  return (
    <div
      className="flex w-full flex-col space-y-4 rounded-b-sm border-gray-600 bg-brand-500 p-4"
      style={{ minWidth: legendWidth }}
    >
      <ScrollArea className={cn({ 'max-h-[216px]': !isLoadingLayerData })}>
        {isLoadingLayerData ||
          (isLoadingLegendData && (
            <Loading className="relative flex h-10 w-full items-end justify-center py-6" />
          ))}
        {!isLoadingLayerData &&
          !isErrorLayerData &&
          isFetchedLayerData &&
          !isLoadingLegendData &&
          isFetchedLegendData && <LegendGraphic dataLayer={layerData} dataLegend={legendData} />}
      </ScrollArea>

      {isGeostory && compareLayerData && (
        <div
          className="flex w-full flex-col space-y-4 rounded-b-sm border-gray-600 bg-brand-500"
          style={{ minWidth: legendWidth }}
        >
          <div
            className="relative flex items-center justify-between space-x-4 text-secondary-500"
            data-testid="map-legend-item"
          >
            <div data-testid="map-legend-item-title" className="text-xs font-bold" ref={titleRef}>
              {compareLayerData.title}
            </div>
            <div
              className="flex space-x-2 divide-x divide-secondary-800"
              data-testid="map-legend-item-toolbar"
            >
              <div className="flex space-x-2">
                <OpacitySetting
                  defaultValue={compareLayers?.[0].opacity}
                  onChange={handleCompareOpacity}
                />
                {!isGeostory && <LayerVisibility />}
              </div>
              {!isGeostory && <RemoveLayer className="pl-2" />}
            </div>
          </div>

          <ScrollArea className="max-h-[216px]">
            {isLoadingCompare && (
              <Loading className="relative flex h-10 w-full items-end justify-center py-6" />
            )}
            {!isLoadingCompare && !isErrorCompare && isFetchedCompare && (
              <LegendGraphic dataLayer={layerDataCompare} dataLegend={legendDataCompare} />
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Legend;
