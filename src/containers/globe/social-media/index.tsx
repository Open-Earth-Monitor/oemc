'use client';

import { useMediaQuery } from 'react-responsive';

import { orderBy } from 'lodash-es';

import { mobile, tablet } from '@/lib/media-queries';

import { useSocialMedia } from '@/hooks/social-media';

import Loading from '@/components/loading';
import SocialMediaDesktop from './carousel-desktop';
import SocialMediaMobile from './carousel-mobile';

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
    <div className="col-span-12 m-auto flex h-full w-full flex-col items-center justify-center space-y-[18px] sm:space-y-10">
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}
      {isFetched && !isLoading && (isMobile || isTablet) && <SocialMediaMobile data={data} />}
      {isFetched && !isLoading && !isMobile && !isTablet && <SocialMediaDesktop data={data} />}
    </div>
  );
};

export default SocialMediaFeed;
