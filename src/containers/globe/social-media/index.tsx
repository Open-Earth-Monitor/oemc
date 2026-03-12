'use client';

import { useMediaQuery } from 'react-responsive';

import { orderBy } from 'lodash-es';

import { tablet } from '@/lib/media-queries';

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

  const isMobile = useMediaQuery(tablet);

  return (
    <aside>
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}
      {isFetched && !isLoading && isMobile && <SocialMediaMobile data={data} />}
      {isFetched && !isLoading && !isMobile && <SocialMediaDesktop data={data} />}
    </aside>
  );
};

export default SocialMediaFeed;
