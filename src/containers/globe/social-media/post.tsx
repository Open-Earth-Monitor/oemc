import { Post as PostTypes } from '@/hooks/social-media';

import { PostHeader } from '@/components/social-media/post-header';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export const Post = ({ post, children }: { post: PostTypes; children?: React.ReactNode }) => {
  const data = post?.reblog || post;
  return (
    <div className="flex h-full min-h-[200px] flex-col gap-y-4  p-4" key={post.id}>
      <PostHeader post={post} />

      <div className="relative">
        {!!data?.media_attachments?.length && data.media_attachments.length > 1 && (
          <Carousel className="w-full">
            <CarouselContent>
              {data.media_attachments.map((att, index) => (
                <CarouselItem key={index} className="w-full basis-auto">
                  <div
                    className="relative h-[150px] w-full flex-1 overflow-hidden rounded-sm"
                    style={{
                      backgroundImage: `url(${att.preview_url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {!!data?.media_attachments.length && data?.media_attachments.length === 1 && (
          <div
            className="relative h-[150px] w-full flex-1 overflow-hidden rounded-sm"
            style={{
              backgroundImage: `url(${data?.media_attachments[0].preview_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        {/* If no media attachments, show the card description */}
        {!data?.media_attachments?.length && (
          <p className="line-clamp-6 overflow-hidden text-xs text-white-500">
            {data.card?.description || <span dangerouslySetInnerHTML={{ __html: data?.content }} />}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

export default Post;
