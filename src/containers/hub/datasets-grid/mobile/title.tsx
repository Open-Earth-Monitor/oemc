import { useMonitorsAndGeostories } from '@/hooks/datasets';

function LandingDatasetsGridTitleMobile() {
  const { data: results, isLoading } = useMonitorsAndGeostories(null, {
    select: (data) => {
      return data.length;
    },
  });

  return (
    <div className="space-y-2">
      <h1 className="text-white-500">Explore our Monitors & Geostories</h1>
      {isLoading && (
        <div className="bg-white/5 relative overflow-hidden rounded-md" aria-hidden>
          <div className="via-white/10 absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent to-transparent" />
        </div>
      )}
      {!isLoading && (
        <span className="flex w-fit space-x-1 rounded-full bg-white-500 bg-opacity-5 px-2 text-sm font-medium">
          <span>{results}</span>
          <span>{results === 1 ? 'result' : 'results'}</span>
        </span>
      )}
    </div>
  );
}

export default LandingDatasetsGridTitleMobile;
