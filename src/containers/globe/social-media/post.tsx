import Image from 'next/image';

import { Post as PostTypes } from '@/hooks/social-media';

import { PostHeader } from '@/components/social-media/post-header';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export const Post = ({ post, children }: { post: PostTypes; children?: React.ReactNode }) => {
  const data = post?.reblog || post;
  return (
    <div className="flex h-full flex-col gap-y-4 rounded-3xl bg-white-950 p-4" key={post.id}>
      <PostHeader post={post} />

      <div className="relative">
        {!!data?.media_attachments?.length && data.media_attachments.length > 1 && (
          <Carousel className="w-full">
            <CarouselContent>
              {data.media_attachments.map((att, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[30vh]  w-full overflow-hidden rounded-md xl:h-20">
                    <Image
                      src={att.preview_url}
                      alt={att.description || data?.card?.title || 'post'}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        {!!data?.media_attachments.length && data?.media_attachments.length === 1 && (
          <div className="relative h-[30vh] overflow-hidden rounded-md pt-4 xl:h-20">
            <Image
              src={data?.media_attachments[0].preview_url}
              alt={data?.media_attachments[0].description || data?.card?.title || 'post'}
              fill
              className="object-cover"
            />
          </div>
        )}
        {/* If no media attachments, show the card description */}
        {!data?.media_attachments?.length && (
          <p className="line-clamp-6 overflow-hidden text-xs text-white-700">
            {data.card?.description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

export default Post;
