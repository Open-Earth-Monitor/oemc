import { UseCase } from '@/types/monitors-and-geostories';

const DoiBadge: React.FC<{
  doi: UseCase['doi'][number];
}> = ({ doi }) => {
  return (
    <div className="flex overflow-hidden rounded-sm text-xs text-white">
      <span className="bg-[#5C5C5C] px-2">DOI</span>
      <span className="rounded-r-sm bg-[#2282C2] px-2">{doi}</span>
    </div>
  );
};

export default DoiBadge;
