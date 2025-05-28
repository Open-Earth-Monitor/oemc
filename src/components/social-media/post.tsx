import { Post as PostTypes } from '@/hooks/social-media';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { PostHeader } from '@/components/social-media/post-header';
import { PostHero } from './post-hero';

export const Post = ({ post }: { post: PostTypes }) => {
  const data = post?.reblog || post;

  return (
    <div className="h-full min-h-[400px] max-w-xs bg-black-500 bg-opacity-30 " key={post.id}>
      <div className="p-5">
        <PostHeader post={post} />
        <PostHero post={post} />
      </div>
      <div className="relative">
        {!!data?.media_attachments.length && data?.media_attachments.length > 1 && (
          <Carousel className="w-full">
            <CarouselContent>
              {data?.media_attachments?.map((_, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={_.preview_url}
                    alt={_.description || data?.card?.title}
                    width={_.meta.small.width}
                    height={_.meta.small.height}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        {!!data?.media_attachments.length && data?.media_attachments.length === 1 && (
          <Image
            src={data?.media_attachments[0].preview_url}
            alt={data?.media_attachments[0].description || data?.card?.title || 'post'}
            width={data?.media_attachments[0].meta.small.width}
            height={data?.media_attachments[0].meta.small.height}
          />
        )}
        {/* If no media attachments, show the card description */}
        {!data?.media_attachments?.length && <p className="px-5 py-8">{data.card?.description}</p>}
      </div>
    </div>
  );
};

export default Post;
