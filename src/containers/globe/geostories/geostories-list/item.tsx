import Image from 'next/image';
import Link from 'next/link';

import { Geostory } from '@/types/geostories';

import { CATEGORIES_COLORS } from '@/constants/categories';

const GeostoryItem = (props: Geostory) => {
  const { id, title: label, theme } = props;

  return (
    <Link
      href={`explore/geostory/${id}`}
      className="group/item flex cursor-pointer items-start"
    >
      <div
        className="mr-2 h-[79px] w-px shrink-0 whitespace-normal transition-[width] duration-200 ease-out group-hover/item:w-1"
        style={{ backgroundColor: CATEGORIES_COLORS[theme].base || '#FFFFFF' }}
      />

      <div className="relative mr-4 h-[79px] w-[79px] shrink-0">
        <Image
          src={`/images/geostories/${id}.jpg`}
          alt={label}
          width={79}
          height={79}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-black-500/30 transition-opacity duration-300 ease-out group-hover/item:opacity-0" />
      </div>

      <div className="flex flex-col gap-3">
        <span className="whitespace-nowrap text-xs font-medium text-white-500">{theme}</span>
        <span
          className="font-medium text-white-500"
          style={{ color: CATEGORIES_COLORS[theme].base || '#FFFFFF' }}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default GeostoryItem;
