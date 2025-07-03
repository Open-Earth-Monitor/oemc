'use client';

import * as React from 'react';

import { useMediaQuery } from 'react-responsive';

import { orderBy } from 'lodash-es';

import { mobile, tablet } from '@/lib/media-queries';

import { useSocialMedia } from '@/hooks/social-media';

import Loading from '@/components/loading';
import SocialMediaDesktop from '@/components/social-media/carousel-desktop';
import SocialMediaMobile from '@/components/social-media/carousel-mobile';

const SocialMediaFeed = () => {
  const { data, isLoading, isFetched } = useSocialMedia(null, {
    select: (data) => {
      const orderedData = orderBy(data, 'created_at', 'desc');
      const postsIds = orderedData.map((post) => post.id);
      const filteredData = orderedData.filter((post) => !postsIds.includes(post.reblog?.id));
      return filteredData;
    },
  });

  const isMobile = useMediaQuery(mobile);
  const isTablet = useMediaQuery(tablet);
  return (
    <section className="container relative min-h-screen w-full font-satoshi">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[url(/images/landing/bg_social_media.svg)] bg-cover bg-center" />
      <div className="col-span-12 m-auto flex flex-col items-center justify-center space-y-[18px] sm:space-y-10">
        <h3 className="max-w-md py-6 text-center font-medium sm:text-2xl md:max-w-xl md:pb-12 md:pt-20 lg:max-w-3xl lg:py-28 lg:text-[28px]">
          <span className="text-white-500 sm:text-2xl lg:text-[28px]">
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
        {isFetched && !isLoading && (isMobile || isTablet) && <SocialMediaMobile data={data} />}
        {isFetched && !isLoading && !isMobile && !isTablet && <SocialMediaDesktop data={data} />}
      </div>
    </section>
  );
};

export default SocialMediaFeed;
