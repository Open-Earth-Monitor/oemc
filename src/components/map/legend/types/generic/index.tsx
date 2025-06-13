import { useLayer } from '@/hooks/layers';
import { useSyncLayersSettings } from '@/hooks/sync-query';

export const Legend: React.FC<{ isGeostory?: boolean }> = ({ isGeostory = false }) => {
  const [layers] = useSyncLayersSettings();
  const layerId = layers?.[0]?.id;
  const {
    data: layerData,
    isLoading,
    isFetched,
    isError,
  } = useLayer({
    layer_id: layerId,
  });
  return (
    <>
      {layerData?.gs_style &&
        layerData?.gs_style.length > 8 &&
        !isLoading &&
        isFetched &&
        !!isError && (
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
                <div className="text-left text-xs text-secondary-500 opacity-50">{label}</div>
              </div>
            ))}
            <div className="from-black-500 absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t via-transparent to-transparent" />
          </div>
        )}

      {layerData?.gs_style &&
        layerData?.gs_style.length <= 8 &&
        !isError &&
        !isLoading &&
        isFetched && (
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
    </>
  );
};

export default Legend;
