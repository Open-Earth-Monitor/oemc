import { unescapeHtml } from '@/lib/format';

import { LegendItem } from '@/components/map/legend/types';

const legendBreakpoint = 16;
export const LegendTypeChoropleth: React.FC<{
  entries: LegendItem['entries'];
}> = ({ entries }) => {
  return (
    <div>
      <div className="flex w-full overflow-hidden">
        {entries.length <= legendBreakpoint &&
          entries.map((entry, i) => (
            <div
              key={i}
              className="h-2 flex-1"
              style={{ backgroundColor: entry?.color }}
              title={entry?.label}
            />
          ))}
      </div>
      {entries.length > legendBreakpoint && (
        <div className="grid grid-cols-2 gap-x-4 p-2">
          <div className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-t from-transparent via-black-500 to-black-500" />

          {/* First column */}
          <div className="flex flex-col space-y-1">
            {entries.slice(0, Math.ceil(entries.length / 2)).map((entry, i) => (
              <div
                key={`col1-${entry?.label}`}
                className="flex items-baseline space-x-2"
                data-testid="dataset-legend-item"
              >
                <div className="h-2 w-2" style={{ backgroundColor: entry?.color }} />
                <div className="text-left text-xs text-gray-600">{unescapeHtml(entry?.label)}</div>
              </div>
            ))}
          </div>

          {/* Second column */}
          <div className="flex flex-col space-y-1">
            {entries.slice(Math.ceil(entries.length / 2)).map((entry, i) => (
              <div
                key={`col2-${entry?.label}`}
                className="flex items-baseline space-x-2"
                data-testid="dataset-legend-item"
              >
                <div className="h-2 w-2" style={{ backgroundColor: entry?.color }} />
                <div className="text-left text-xs text-gray-600">{unescapeHtml(entry?.label)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {entries.length <= legendBreakpoint && (
        <div className="flex w-full justify-between text-[10px] text-gray-200">
          {entries.map((entry, i) => (
            <span key={i} className="w-full truncate text-center">
              {unescapeHtml(entry?.label)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LegendTypeChoropleth;
