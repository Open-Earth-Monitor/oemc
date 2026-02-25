'use client';

import { useEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';

import { Post } from './post';

const CarouselButton = ({ direction }: { direction: 'prev' | 'next' }) => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  return (
    <button
      onClick={direction === 'prev' ? scrollPrev : scrollNext}
      disabled={direction === 'prev' ? !canScrollPrev : !canScrollNext}
      className="absolute bottom-0 z-10 rounded-full bg-white-950 p-2 shadow-md disabled:opacity-50"
      style={direction === 'prev' ? { left: '10px' } : { right: '10px' }}
      aria-label={direction === 'prev' ? 'Previous Slide' : 'Next Slide'}
    >
      {direction === 'prev' ? <ChevronLeftIcon size={20} /> : <ChevronRightIcon size={20} />}
    </button>
  );
};

const SocialMediaDesktop = ({ data }: { data: any[] }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [count, setCount] = useState(1);

  const dataLength = data?.length ?? 0;

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCount(api.selectedScrollSnap() + 1);
    };

    update(); // initial
    api.on('select', update);
    api.on('reInit', update);

    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api]);

  return (
    <aside className="w-[320px] shrink-0 overflow-hidden">
      <div className="h-[calc(100vh-400px)]">
        <div className="flex h-full flex-col gap-y-6 px-5">
          <div className="flex items-end justify-between font-medium text-white-500">
            <p>
              Latest insights <br /> and innovations.
            </p>
            <span>
              {count} / {dataLength}
            </span>
          </div>

          <div className="max-h-64 min-h-0 flex-1 overflow-hidden">
            <Carousel
              opts={{ align: 'center', loop: true, slidesToScroll: 1, active: true }}
              className="relative h-full"
              setApi={setApi}
            >
              <CarouselContent className="h-full">
                {data?.map((post) => (
                  <CarouselItem
                    key={post.id}
                    className="flex h-full max-w-xs items-start justify-center"
                  >
                    <div className="h-full w-full overflow-hidden">
                      <Post post={post} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselButton direction="prev" />
              <CarouselButton direction="next" />
            </Carousel>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SocialMediaDesktop;
