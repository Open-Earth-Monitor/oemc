import { unescapeHtml } from '@/lib/format';

import { LayerParsed } from '@/types/layers';

import { LegendItem } from '@/components/map/legend/types';

export const LegendTypeGeneric: React.FC<{
  dataLayer: LayerParsed;
  dataLegend: LegendItem;
}> = ({ dataLayer }) => {
  const { gs_style } = dataLayer || {};

  return (
    <>
      {gs_style?.length > 8 && (
        <div className="flex flex-col space-y-1 p-2">
          <div className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-t from-transparent via-black-500 to-black-500" />

          {gs_style?.map(({ color, label }) => (
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
              <div className="text-left text-xs text-gray-600">{label}</div>
            </div>
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black-500 via-transparent to-transparent" />
        </div>
      )}

      {gs_style?.length <= 8 && (
        <div className="flex">
          {gs_style?.map(({ color, label }) => (
            <div key={label} className="grow space-y-2" data-testid="dataset-legend-item">
              <div
                className="h-2 w-full"
                style={{
                  backgroundColor: color,
                }}
              />
              <div className="text-center text-xs">{unescapeHtml(label)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LegendTypeGeneric;
