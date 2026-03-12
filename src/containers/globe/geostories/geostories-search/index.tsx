import { LuSearch } from 'react-icons/lu';

import Search from '@/components/search';

import { cn } from 'lib/classnames';

export default function GlobeSearch({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      className={cn(
        'group mb-4 flex w-full items-center sm:w-40',
        'rounded-[50px] border border-white-800/20 px-5 py-2.5 text-white-700/50',
        'transition-[background-color,width] duration-300 ease-out',
        'focus-within:bg-white-500 sm:focus-within:w-full'
      )}
    >
      <LuSearch
        aria-hidden="true"
        className={cn(
          'shrink-0 text-lg',
          'text-white-700/50 transition-colors duration-200 ease-out',
          'group-focus-within:text-black-500'
        )}
      />
      <Search
        placeholder="Filter Geostories"
        value={value}
        setValue={setValue}
        className={cn(
          'relative flex h-fit min-w-0 flex-1 [&_input]:px-3',
          'transition-colors duration-300 ease-out'
        )}
        hasIcon={false}
      />
    </div>
  );
}
