'use client';

import { useEffect, useMemo, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Post as PostTypes } from '@/hooks/social-media';

import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';

import { Post } from '../post';

const CarouselButton = ({ direction }: { direction: 'prev' | 'next' }) => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  const isPrev = direction === 'prev';

  return (
    <button
      onClick={isPrev ? scrollPrev : scrollNext}
      disabled={isPrev ? !canScrollPrev : !canScrollNext}
      className="z-10 shrink-0 rounded-full bg-white-950 p-2 shadow-md backdrop-blur-sm disabled:opacity-50"
      aria-label={isPrev ? 'Previous Slide' : 'Next Slide'}
    >
      {isPrev ? (
        <ChevronLeftIcon size={20} className="text-white-500" />
      ) : (
        <ChevronRightIcon size={20} className="text-white-500" />
      )}
    </button>
  );
};

const CarouselDots = ({
  api,
  total,
  activeIndex,
  visibleDots = 6,
}: {
  api: CarouselApi | null;
  total: number;
  activeIndex: number;
  visibleDots?: number;
}) => {
  const DOT_SIZE = 8; // h-1 w-1 => 4px
  const GAP = 8; // gap-2 => 8px
  const STEP = DOT_SIZE + GAP;

  const maxStart = Math.max(0, total - visibleDots);

  const startIndex = useMemo(() => {
    if (total <= visibleDots) return 0;

    const centeredStart = activeIndex - Math.floor(visibleDots / 2);
    return Math.max(0, Math.min(centeredStart, maxStart));
  }, [activeIndex, total, visibleDots, maxStart]);

  const translateX = startIndex * STEP;
  const viewportWidth = visibleDots * DOT_SIZE + (visibleDots - 1) * GAP;

  if (!total) return null;

  return (
    <div className="h-full overflow-x-hidden py-2" style={{ width: `${viewportWidth}px` }}>
      <div
        className="flex items-center gap-2 px-2 transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${translateX}px)` }}
      >
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 w-2 shrink-0 rounded-full transition-all ${
              activeIndex === index
                ? 'scale-150 bg-gradient-to-br from-[#1EEDBF] to-[#75A1FF]'
                : 'bg-white-500/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const SocialMediaContent = ({
  data,
  setCount,
  count,
}: {
  data: PostTypes[];
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const dataLength = data?.length ?? 0;
  const activeIndex = count - 1;

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCount(api.selectedScrollSnap() + 1);
    };

    update();
    api.on('select', update);
    api.on('reInit', update);

    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api, setCount]);

  return (
    <div className="min-h-0 flex-1 overflow-hidden xl:max-h-64">
      <Carousel
        opts={{ align: 'center', loop: true, slidesToScroll: 1, active: true }}
        className="relative h-full"
        setApi={setApi}
      >
        <CarouselContent className="h-full">
          {data?.map((post) => (
            <CarouselItem
              key={post.id}
              className="flex h-full items-start justify-center lg:max-w-md xl:max-w-xs"
            >
              <div className="h-full w-full overflow-hidden">
                <Post post={post} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4">
          <CarouselButton direction="prev" />
          <CarouselDots api={api} total={dataLength} activeIndex={activeIndex} visibleDots={6} />
          <CarouselButton direction="next" />
        </div>
      </Carousel>
    </div>
  );
};

const SocialMediaDesktop = ({ data }: { data: PostTypes[] }) => {
  const [count, setCount] = useState(1);

  const dataLength = data?.length ?? 0;

  return (
    <aside className="pointer-events-auto h-fit w-full overflow-hidden rounded-2xl bg-black-500/70 pb-10 backdrop-blur-sm xl:h-fit xl:w-[320px]">
      <div className="h-full">
        <div className="flex h-full flex-col gap-y-6 px-5">
          <div className="flex items-end justify-between font-medium text-white-500">
            <p>
              Latest insights <br /> and innovations.
            </p>
            <span>
              {count} / {dataLength}
            </span>
          </div>

          <SocialMediaContent data={data} setCount={setCount} count={count} />
        </div>
      </div>
    </aside>
  );
};

export default SocialMediaDesktop;
