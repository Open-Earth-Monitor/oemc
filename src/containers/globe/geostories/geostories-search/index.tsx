import { LuSearch } from 'react-icons/lu';

import Search from '@/components/search';

export default function GlobeSearch({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="mb-4 rounded-[50px] border-[0.5px] border-white-800/20 px-5 py-2.5 text-white-700/50">
      <Search
        placeholder="Filter Geostories"
        value={value}
        setValue={setValue}
        className="flex h-full flex-1"
        hasIcon={false}
      >
        <LuSearch className="absolute left-3 top-1/2 inline-block -translate-y-1/2 transform text-lg text-white-500" />
      </Search>
    </div>
  );
}
