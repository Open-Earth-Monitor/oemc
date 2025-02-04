import { COMPARE_DATA_COLOR, DATA_COLOR } from './utils';

type ChartLegendProps = {
  title: string;
  compareTitle: string;
};
const ChartLegend = ({ title, compareTitle }: ChartLegendProps) => {
  return (
    <div className="mt-5">
      <ul className="columns-2 text-[#848981]">
        <li className="flex items-center gap-2">
          <div
            style={{
              backgroundColor: DATA_COLOR,
            }}
            className="h-px w-8"
          />
          <span className="font-inter text-[10px]">{title}</span>
        </li>
        <li className="flex items-center gap-2">
          <div
            style={{
              backgroundColor: COMPARE_DATA_COLOR,
            }}
            className="h-px w-8"
          />
          <span className="font-inter text-[10px]">{compareTitle}</span>
        </li>
      </ul>
    </div>
  );
};

export default ChartLegend;
