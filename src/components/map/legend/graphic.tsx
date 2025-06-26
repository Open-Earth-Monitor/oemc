import { unescapeHtml } from '@/lib/format';

import { LayerParsed, ParsedLegend } from '@/types/layers';

import { RampLegend } from '@/components/map/legend/types/gradient';
import { IntervalsLegend } from '@/components/map/legend/types/intervals';

export const LegendGraphic: React.FC<{
  dataLayer: LayerParsed;
  dataLegend: ParsedLegend;
}> = ({ dataLayer, dataLegend }) => {
  const { entries, type } = dataLegend || {};
  const { gs_style, unit } = dataLayer || {};

  return (
    <div>
      {type === 'intervals' && <IntervalsLegend entries={entries} />}

      {type === 'ramp' && <RampLegend entries={entries} />}

      {type !== 'intervals' && type !== 'ramp' && gs_style && gs_style?.length > 8 && (
        <div className="flex flex-col space-y-1 p-2">
          <div className="to-black-500 via-black-500 absolute left-0 right-0 top-0 h-10 bg-gradient-to-t from-transparent" />

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
          <div className="from-black-500 absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t via-transparent to-transparent" />
        </div>
      )}

      {type !== 'intervals' && type !== 'ramp' && gs_style && gs_style?.length <= 8 && (
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
      {unit && (
        <div title={unit} className="w-full text-right text-xs text-gray-600">
          ({unit})
        </div>
      )}
    </div>
  );
};

export default LegendGraphic;
