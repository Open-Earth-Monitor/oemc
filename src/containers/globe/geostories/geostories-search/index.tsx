import { LuSearch } from 'react-icons/lu';

import Search from '@/components/search';

import { cn } from 'lib/classnames';

const SIZE = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export default function GlobeSearch({
  value,
  setValue,
  size = 'md',
  mobile = false,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  size?: keyof typeof SIZE;
  mobile?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative ',
        'group relative flex w-fit items-center overflow-hidden rounded-[50px]',
        !mobile && 'hover:w-full hover:max-w-sm'
      )}
      //   'text-white-700/50 transition-[background-color,border-color,width] duration-300 ease-out',
      //   'sm:w-40 sm:focus-within:w-full',
      //   !mobile && 'sm:focus-within:bg-white-500',
      //   mobile && 'focus-within:border-accent-green hover:border-accent-green',
      //   className
      // )}
    >
      <Search
        placeholder="Filter Geostories"
        value={value}
        setValue={setValue}
        hasIcon={false}
        className={cn(
          'relative flex flex-1 bg-transparent',
          SIZE[size],
          '[&_input]:w-full [&_input]:min-w-0 [&_input]:bg-transparent [&_input]:px-3',
          '[&_input]:!border-white-700/50',
          // '[&_input]:border-0 [&_input]:outline-none [&_input]:ring-0',
          // '[&_input]:focus:border-0 [&_input]:focus:outline-none [&_input]:focus:ring-0',
          // '[&_input]:focus-visible:outline-none [&_input]:focus-visible:ring-0'
          !mobile &&
            'focus-within:w-full focus-within:max-w-sm focus-within:bg-white-500 hover:w-full hover:max-w-sm hover:bg-white-500 [&_input]:!border ',
          mobile &&
            '[&_input]:!border-white-700/50 [&_input]:focus-within:border-accent-green [&_input]:focus:outline-none [&_input]:focus:ring-0'
        )}
      />

      {value === '' && (
        <LuSearch
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute right-5 text-lg transition-colors duration-200 ease-out',
            'text-white-500 group-focus-within:text-black-500',
            !mobile && 'group-hover:text-black-500',
            mobile && ' group-focus-within:text-white-500'
          )}
        />
      )}
    </div>
  );
}
