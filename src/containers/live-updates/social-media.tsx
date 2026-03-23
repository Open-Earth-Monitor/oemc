'use client';

import { Post } from '@/containers/globe/social-media/post';
import { orderBy } from 'lodash';
import { useSocialMedia } from '@/hooks/social-media';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

export const SocialMedia = () => {
  const { data, isLoading } = useSocialMedia(null, {
    select: (data) => {
      const orderedData = orderBy(data, 'created_at', 'desc');
      const postsIds = orderedData.map((post) => post.id);
      const filteredData = orderedData.filter((post) => !postsIds.includes(post.reblog?.id));
      return filteredData;
    },
  });

  return (
    <div className="flex flex-col gap-4 pb-16 sm:flex-row sm:flex-wrap sm:justify-start xl:gap-6">
      {isLoading && (
        <div className="flex w-full  flex-col  gap-4 overflow-hidden pb-16 sm:flex-row sm:flex-wrap sm:justify-start ">
          {Array.from({ length: 40 }).map((_, index) => (
            <Skeleton
              key={index}
              className="min-w-[320px] flex-1 rounded-3xl xl:h-20 xl:min-h-[320px] xl:gap-6"
            />
          ))}
        </div>
      )}
      {!isLoading &&
        data?.map((post) => (
          <div
            key={post.id}
            className="flex flex-1 items-stretch justify-center lg:max-w-md xl:max-w-xs"
          >
            <div className="flex w-full min-w-[320px] flex-col overflow-hidden xl:min-h-[320px]">
              <Post post={post}>
                <div className="mt-auto flex w-full justify-end">
                  <Link
                    href={post.url}
                    target="_blank"
                    className="w-fit space-x-2.5 rounded-sm bg-white-950 p-2.5 text-sm text-white-500"
                  >
                    Read more
                    <ArrowRight className="inline h-6 w-6" />
                  </Link>
                </div>
              </Post>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SocialMedia;
