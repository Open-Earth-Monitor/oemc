'use client';

import * as React from 'react';

import { Post } from '@/components/social-media/post';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const SocialMediaMobile = ({ data }) => (
  <Carousel
    className="w-full"
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
            className="flex items-center justify-center transition-all
             duration-300"
          >
            <Post post={post} />
          </CarouselItem>
        );
      })}
    </CarouselContent>
    <CarouselPrevious
      variant="background"
      className="-bottom-20 left-1/2 top-auto translate-x-[calc(50%-72px)]"
    />
    <CarouselNext variant="background" className="-bottom-20 left-1/2 top-auto translate-x-1/2" />
  </Carousel>
);

export default SocialMediaMobile;
