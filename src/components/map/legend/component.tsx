import { useState, useCallback, createRef, useLayoutEffect } from 'react';

import { usePathname } from 'next/navigation';

import cn from '@/lib/classnames';

import { useLayer, useLegendGraphic } from '@/hooks/layers';
import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import Loading from '@/components/loading';
import { ScrollArea } from '@/components/ui/scroll-area';

import LegendGraphic from './graphic';
import OpacitySetting from './opacity';
import RemoveLayer from './remove';
import LegendTimeseries from './timelime';
import LayerVisibility from './visibility';

export const Legend: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const layerId = layers?.[0]?.id;

  const handleOpacity = useCallback(
    (nexOpacity: number) => {
      void setLayers((prevState) => [{ ...prevState?.[0], opacity: nexOpacity }]);
    },
    [setLayers]
  );

  const { data: compareLayerData } = useLayer(
    { layer_id: compareLayers?.[0]?.id, compare: true },
    { enabled: !!compareLayers }
  );

  const isGeostory = usePathname().startsWith('/explore/geostory');

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
    isLoading: isLoadingLegendData,
    isFetched: isFetchedLegendData,
  } = useLegendGraphic({
    gs_name: layerData?.gs_name,
    gs_base_wms: layerData?.gs_base_wms,
  });

  const { data: legendDataCompare } = useLegendGraphic({
    gs_base_wms: layerDataCompare?.gs_base_wms,
    gs_name: layerDataCompare?.gs_name,
  });

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
      className="flex w-full flex-col space-y-4 overflow-hidden rounded-b-sm border-gray-600 bg-brand-500 px-4 py-4 md:py-0"
      style={{ minWidth: legendWidth }}
    >
      {/* Primary layer toolbar — mobile only (desktop renders it in the legend trigger) */}
      <div
        className="relative flex items-center justify-between space-x-4 text-secondary-500 md:hidden"
        data-testid="map-legend-item"
      >
        <div
          data-testid="map-legend-item-title"
          className="line-clamp-2 min-w-0 max-w-[60%] text-xs font-bold"
          title={layerData?.title}
        >
          {layerData?.title}
        </div>
        <div
          className="flex shrink-0 space-x-2 divide-x divide-secondary-800"
          data-testid="map-legend-item-toolbar"
        >
          <div className="flex space-x-2">
            <OpacitySetting defaultValue={layers?.[0]?.opacity} onChange={handleOpacity} />
            <LayerVisibility />
          </div>
          <RemoveLayer className="pl-2" />
        </div>
      </div>
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
        {isGeostory && compareLayerData && compareLayers?.[0]?.id !== layerId && (
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
                className="line-clamp-2 min-w-0 max-w-[60%] text-xs font-bold"
                ref={titleRef}
                title={compareLayerData.title}
              >
                {compareLayerData.title}
              </div>
              <div
                className="flex shrink-0 space-x-2 divide-x divide-secondary-800"
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
              {children}
            </ScrollArea>
          </div>
        )}
        <LegendTimeseries />
      </ScrollArea>
    </div>
  );
};

export default Legend;
