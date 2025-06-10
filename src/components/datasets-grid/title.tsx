import { useMonitorsAndGeostories } from '@/hooks/datasets';

function LandingDatasetsGridTitle() {
  const { data: results } = useMonitorsAndGeostories(null, {
    select: (data) => {
      return data.length;
    },
  });

  return (
    <div className="flex gap-4">
      <h1 className="text-[28px] text-white-500">Explore our Monitors & Geostories</h1>
      <span className="flex w-fit justify-end space-x-1 place-self-end rounded-full bg-white-500 bg-opacity-5 px-2 text-sm font-medium">
        <span>{results}</span>
        <span>{results === 1 ? 'result' : 'results'}</span>
      </span>
    </div>
  );
}

export default LandingDatasetsGridTitle;
