import Image from 'next/image';
import Link from 'next/link';

import { Geostory } from '@/types/geostories';

import { CATEGORIES_COLORS } from '@/constants/categories';

const GeostoryItem = (props: Geostory) => {
  const { id, title: label, theme } = props;

  return (
    <Link href={`explore/geostory/${id}`} className="flex cursor-pointer items-center space-x-4">
      <div
        className="h-[79px] w-0.5 shrink-0 whitespace-normal"
        style={{ backgroundColor: CATEGORIES_COLORS[theme].base || '#FFFFFF' }}
      />

      <Image
        src={`/images/geostories/${id}.jpg`}
        alt={label}
        width={79}
        height={79}
        className="h-[79px] w-[79px] shrink-0 object-cover"
      />

      <div className="flex flex-col">
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
