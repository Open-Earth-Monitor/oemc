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

const SocialMediaDesktop = ({ data }) => (
  <Carousel
    className="w-full lg:px-28 xl:px-24 2xl:px-20"
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
             duration-300 lg:basis-1/2 xl:basis-1/3"
          >
            <Post post={post} />
          </CarouselItem>
        );
      })}
    </CarouselContent>
    <CarouselPrevious variant="background" className="right-12" />
    <CarouselNext variant="background" className="right-0" />
  </Carousel>
);

export default SocialMediaDesktop;
