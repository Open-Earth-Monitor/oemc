export const IntervalsLegend: React.FC<{ entries }> = ({ entries = [false] }) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <div className="flex w-full overflow-hidden">
        {entries.map((entry, i) => (
          <div
            key={i}
            className="h-2 flex-1"
            style={{ backgroundColor: entry?.color }}
            title={entry?.label}
          />
        ))}
      </div>
      <div className="flex w-full justify-between text-[10px] text-gray-600">
        {entries.map((entry, i) => (
          <span key={i} className="w-full truncate text-center">
            {entry?.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IntervalsLegend;
