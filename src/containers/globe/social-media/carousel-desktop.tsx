'use client';

import { useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Post } from './post';
import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel';

import { CarouselApi } from '@/components/ui/carousel';

const CarouselButton = ({ direction }: { direction: 'prev' | 'next' }) => {
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext, api } = useCarousel();

  const handlePrev = () => {
    setCurrent(api.selectedScrollSnap() - 1);
    scrollPrev();
  };

  const handleNext = () => {
    setCurrent(api.selectedScrollSnap() + 1);
    scrollNext();
  };
  console.log(current, count);
  return (
    <button
      onClick={direction === 'prev' ? handlePrev : handleNext}
      disabled={direction === 'prev' ? !canScrollPrev : !canScrollNext}
      className="absolute bottom-0 z-10 rounded-full bg-white-950 p-2 shadow-md disabled:opacity-50"
      style={direction === 'prev' ? { left: '10px' } : { right: '10px' }}
      aria-label={direction === 'prev' ? 'Previous Slide' : 'Next Slide'}
    >
      {direction === 'prev' ? <ChevronLeftIcon size={20} /> : <ChevronRightIcon size={20} />}
    </button>
  );
};

const SocialMediaDesktop = ({ data }) => {
  const dataLength = data?.length || 0;
  return (
    <aside className="w-[320px] shrink-0 overflow-hidden">
      <div className="flex h-[calc(100vh-400px)] flex-col px-5 pb-6">
        <div className="flex items-end justify-between font-medium text-white-500">
          <p>
            Latest insights <br /> and innovations.
          </p>
          <span>{dataLength}</span>
        </div>
        <Carousel
          opts={{
            align: 'center',
            loop: true,
            slidesToScroll: 1,
            active: true,
          }}
          className="relative bg-lime-200/10"
        >
          <CarouselContent>
            {data?.map((post) => {
              return (
                <CarouselItem key={post.id} className="flex items-start justify-center">
                  <Post post={post} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselButton direction="prev" />
          <CarouselButton direction="next" />
        </Carousel>
      </div>
    </aside>
  );
};

export default SocialMediaDesktop;
