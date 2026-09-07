import Image from 'next/image';
import Link from 'next/link';

import { useTrackEvent } from '@/lib/analytics';

import { Geostory } from '@/types/geostories';

import { CATEGORIES_COLORS } from '@/constants/categories';

import { getGeostoryImageUrl } from '@/hooks/geostories';

const GeostoryItem = (props: Geostory) => {
  const { id, title: label, theme } = props;
  const track = useTrackEvent();

  return (
    <Link
      href={`explore/geostory/${id}`}
      data-testid={`geostory-item-${id}`}
      className="group/item flex cursor-pointer items-start"
      onClick={() =>
        track('Geostory Open', {
          props: { geostory_id: id, title: label, source: 'landing-globe' },
        })
      }
    >
      <div
        className="mr-2 h-[79px] w-px shrink-0 whitespace-normal transition-[width] duration-200 ease-out group-hover/item:w-1"
        style={{ backgroundColor: CATEGORIES_COLORS[theme].base || '#FFFFFF' }}
      />

      <div className="relative mr-4 h-[79px] w-[79px] shrink-0">
        {/* Declared at twice the 79px box: the optimizer then serves a 256px
            bitmap on 1x screens and 384px on 2x, so the browser downsamples a
            detailed image instead of showing a 96px one, and quality 90 keeps
            the covers crisp. The CSS still fixes the box at 79px. */}
        <Image
          src={getGeostoryImageUrl(id)}
          alt={label}
          width={158}
          height={158}
          quality={90}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-black-500/30 transition-opacity duration-300 ease-out group-hover/item:opacity-0" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
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
