import { UseCase } from '@/types/monitors-and-geostories';

const DoiBadge: React.FC<{
  doi: UseCase['doi'][number];
}> = ({ doi }) => {
  return (
    <div className="text-white flex overflow-hidden whitespace-nowrap rounded-sm text-xs">
      <span className="bg-[#5C5C5C] px-2">DOI</span>
      <span className="rounded-r-sm bg-[#2282C2] px-2">{doi}</span>
    </div>
  );
};

export default DoiBadge;
