'use client';

import { orderBy } from 'lodash-es';

import { useSocialMedia } from '@/hooks/social-media';

import SocialMediaDesktop from '@/containers/globe/social-media/desktop/carousel';

import Loading from '@/components/loading';

const SocialMediaFeed = () => {
  const { data, isLoading } = useSocialMedia(null, {
    select: (data) => {
      const orderedData = orderBy(data, 'created_at', 'desc');
      const postsIds = orderedData.map((post) => post.id);
      const filteredData = orderedData.filter((post) => !postsIds.includes(post.reblog?.id));
      return filteredData;
    },
  });

  return (
    <aside className="h-fit">
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}
      <SocialMediaDesktop data={data} />
    </aside>
  );
};

export default SocialMediaFeed;
