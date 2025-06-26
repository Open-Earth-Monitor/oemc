import { unescapeHtml } from '@/lib/format';

import { ParsedLegend } from '@/types/layers';

export const RampLegend: React.FC<{
  entries: ParsedLegend['entries'];
}> = ({ entries }) => {
  return (
    <div className="w-full">
      <div
        className="h-4"
        style={{
          background: `linear-gradient(to right, ${entries?.map((e) => e?.color).join(', ')})`,
        }}
      />
      <div className="mt-1 flex justify-between text-xs text-gray-600">
        <span>{unescapeHtml(entries[0]?.label)}</span>
        <span>{unescapeHtml(entries[entries?.length - 1]?.label)}</span>
      </div>
    </div>
  );
};

export default RampLegend;
