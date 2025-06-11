'use client';

import { orderBy } from 'lodash-es';

import { useSocialMedia } from '@/hooks/social-media';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import Loading from '@/components/loading';
import { Post } from '@/components/social-media/post';

const SocialMediaFeed = () => {
  const { data, isLoading, isFetched } = useSocialMedia(null, {
    select: (data) => {
      const orderedData = orderBy(data, 'created_at', 'desc');
      const postsIds = orderedData.map((post) => post.id);
      const filteredData = orderedData.filter((post) => !postsIds.includes(post.reblog?.id));
      return filteredData;
    },
  });

  return (
    <section className="relative grid h-screen w-full font-satoshi md:grid-cols-10 lg:grid-cols-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[url(/images/landing/bg_social_media.svg)] bg-cover bg-center" />
      <div className="container col-span-12 m-auto flex flex-col items-center justify-center space-y-[18px] sm:space-y-10">
        <h3 className="max-w-xs py-12 text-center text-xl font-medium sm:max-w-sm sm:text-2xl md:max-w-xl lg:max-w-3xl">
          <span className="text-[28px] text-white-500">
            Open Earth Monitor connects people, data, and technology to drive global sustainability.
          </span>{' '}
          <span className="bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] bg-clip-text text-transparent">
            Follow us to stay updated on the latest insights and innovations.
          </span>
        </h3>
        {isLoading && (
          <div>
            <Loading />
          </div>
        )}
        {isFetched && (
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
                    className="flex h-full w-full basis-1/3 items-center justify-center"
                  >
                    <Post post={post} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious variant="background" />
            <CarouselNext variant="background" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default SocialMediaFeed;
