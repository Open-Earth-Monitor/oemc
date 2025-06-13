export const RampLegend: React.FC<{ entries }> = ({ entries = [] }) => {
  return (
    <div className="w-full">
      <div
        className="h-4"
        style={{
          background: `linear-gradient(to right, ${entries?.map((e) => e?.color).join(', ')})`,
        }}
      />
      <div className="mt-1 flex justify-between text-xs text-gray-600">
        <span>{entries[0]?.label}</span>
        <span>{entries[entries?.length - 1]?.label}</span>
      </div>
    </div>
  );
};

export default RampLegend;
