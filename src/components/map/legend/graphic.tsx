import { LayerParsed } from '@/types/layers';

import { LegendItem } from '@/components/map/legend/types';
import { LegendTypeChoropleth } from '@/components/map/legend/types/choropleth';
import LegendTypeGeneric from '@/components/map/legend/types/generic';
import { LegendTypeGradient } from '@/components/map/legend/types/gradient';

export const LegendGraphic: React.FC<{
  dataLayer: LayerParsed;
  dataLegend: LegendItem;
}> = ({ dataLayer, dataLegend }) => {
  const { entries, type } = dataLegend || {};
  const { gs_style, unit } = dataLayer || {};

  return (
    <div>
      {type === 'intervals' && <LegendTypeChoropleth entries={entries} />}

      {type === 'ramp' && <LegendTypeGradient entries={entries} />}

      {type !== 'intervals' && type !== 'ramp' && gs_style && (
        <LegendTypeGeneric dataLayer={dataLayer} dataLegend={dataLegend} />
      )}

      {unit && (
        <div title={unit} className="w-full text-right text-xs text-gray-600">
          {unit}
        </div>
      )}
    </div>
  );
};

export default LegendGraphic;
