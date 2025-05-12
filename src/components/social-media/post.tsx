import { useState, useEffect, useRef } from 'react';

import { LuSplitSquareHorizontal } from 'react-icons/lu';

import { Post as PostTypes } from '@/hooks/social-media';

import { PostHeader } from '@/components/social-media/post-header';

export const Post = ({ post }: { post: PostTypes }) => {
  const [isExpanded] = useState(false);
  const [height, setHeight] = useState(130);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
      setShowReadMore(contentRef.current.scrollHeight > 130);
    }
  }, []);

  const data = post?.reblog || post;

  return (
    <div className="h-full max-w-xs bg-[#09131D4D] p-5" key={post.id}>
      <PostHeader post={post} />

      <div className="space-y-4">
        <div
          ref={contentRef}
          className={`relative text-white-500 ${
            isExpanded ? 'max-h-full' : 'flex items-end space-x-2 overflow-hidden'
          }`}
        >
          <div
            className={`prose:font-medium prose break-words text-white-50 prose-a:font-bold prose-a:text-secondary-600 prose-a:underline ${
              isExpanded ? '' : 'line-clamp-3'
            }`}
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
          {!isExpanded && showReadMore && (
            <div className="absolute -left-4 bottom-0 right-0 h-12 bg-gradient-to-t from-brand-500"></div>
          )}
        </div>

        {height > 80 && (
          <div className="flex items-center space-x-2 text-xs font-bold  underline hover:underline">
            <span>Learn more</span>
            <LuSplitSquareHorizontal className="h-6 w-6" />
          </div>
        )}
      </div>
      {/* <div className="relative mt-5">
        {!!data?.media_attachments.length && (
          <Carousel className="w-full" hasLength={data?.media_attachments?.length > 1}>
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
        <div className="mt-10 text-secondary-700">{formatDate(post?.created_at, false)}</div>
      </div> */}
    </div>
  );
};

export default Post;
