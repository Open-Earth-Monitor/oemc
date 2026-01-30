'use client';

import { Post } from './post';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

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
        >
          <CarouselContent>
            {data?.map((post) => {
              return (
                <CarouselItem
                  key={post.id}
                  className="flex items-start justify-center lg:basis-1/2 xl:basis-1/3"
                >
                  <Post post={post} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </aside>
  );
};

export default SocialMediaDesktop;
