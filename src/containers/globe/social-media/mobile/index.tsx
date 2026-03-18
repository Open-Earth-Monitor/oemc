'use client';

import { useState } from 'react';

import { orderBy } from 'lodash-es';

import { useSocialMedia } from '@/hooks/social-media';

import { SocialMediaContent } from '@/containers/globe/social-media/desktop/carousel';

import Loading from '@/components/loading';

const SocialMediaFeed = () => {
  const [count, setCount] = useState(1);
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

      <SocialMediaContent data={data} setCount={setCount} count={count} />
    </aside>
  );
};

export default SocialMediaFeed;
