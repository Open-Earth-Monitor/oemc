import { MonitorTypes } from '@/types/datasets';

import DatasetsList from '@/components/datasets-list';

export const MonitorsList = ({ monitor }: { monitor: MonitorTypes }) => {
  const { title, description, geostories } = monitor;

  return (
    <div>
      <div className="space-y-2 bg-secondary-200 p-7.5 text-brand-600">
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

export default MonitorsList;
