'use client';

import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Post as PostTypes } from '@/hooks/social-media';

import { Post } from '@/containers/globe/social-media/post';

import { Skeleton } from '@/components/ui/skeleton';

type SocialMediaProps = {
  data: PostTypes[];
  isLoading: boolean;
};

export const SocialMedia = ({ data, isLoading }: SocialMediaProps) => {
  return (
    <div className="m-auto grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:w-full xl:grid-cols-4 xl:gap-6 2xl:grid-cols-6">
      {isLoading &&
        Array.from({ length: 40 }).map((_, index) => (
          <div key={index} className="mx-auto w-full max-w-[420px]">
            <Skeleton className="min-h-[320px] rounded-3xl" />
          </div>
        ))}

      {!isLoading &&
        data?.map((post) => (
          <div
            key={post.id}
            className="mx-auto flex w-full max-w-[420px] cursor-pointer rounded-3xl border border-black-100 transition-colors duration-500 hover:bg-black-100"
          >
            <div className="flex w-full flex-col overflow-hidden">
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
