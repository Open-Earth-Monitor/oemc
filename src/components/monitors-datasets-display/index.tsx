import { MonitorTypes } from '@/types/datasets';

import DatasetsList from '@/components/datasets-list';

export const MonitorDisplay = ({ monitor }: { monitor: MonitorTypes }) => {
  const { title, description, geostories } = monitor;

  return (
    <div>
      <div className="space-y-2 bg-secondary-500 p-7.5 text-brand-500">
        <span className="inter text-xs">MONITOR</span>
        <h2 className="text-5xl">{title}</h2>
        <p>{description}</p>
      </div>
      {geostories.map(({ id, layers }) => (
        <DatasetsList key={id} data={layers} />
      ))}
    </div>
  );
};

export default MonitorDisplay;
