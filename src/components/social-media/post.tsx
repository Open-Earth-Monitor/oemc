import { useState, useEffect, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@/lib/format';

import { Post as PostTypes } from '@/hooks/social-media';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export const Post = ({ post }: { post: PostTypes }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(130);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
      setShowReadMore(contentRef.current.scrollHeight > 130);
    }
  }, []);

  const data = post?.reblog || post;
  return (
    <div className="h-full border border-secondary-500 p-5" key={post.id}>
      <div className="flex items-center space-x-3">
        <Image
          src={data?.account.avatar_static}
          alt={data?.account.display_name}
          width={44}
          height={44}
          className="shrink-0 rounded-full"
        />
        <div className="font-medium">
          <h4 className="">{post?.reblog?.account.display_name || post?.account.display_name}</h4>
          <span className="text-gray-400">@{data?.account.username}</span>
        </div>
      </div>

      <div className="py-5">
        <div className="space-y-4">
          <Link
            title={data?.card?.title}
            className="block max-h-6 truncate py-5 font-bold"
            href={data?.url}
          >
            {data?.card?.title}
          </Link>
          <div
            ref={contentRef}
            className={`relative  text-secondary-500 ${
              isExpanded ? 'max-h-full' : 'flex items-end space-x-2 overflow-hidden'
            }`}
          >
            <div
              className={`prose:font-normal prose text-secondary-500 prose-a:font-bold prose-a:text-secondary-600 prose-a:underline ${
                isExpanded ? '' : 'line-clamp-3'
              }`}
              dangerouslySetInnerHTML={{ __html: data?.content }}
            />
            {!isExpanded && showReadMore && (
              <div className="absolute -left-4 bottom-0 right-0 h-12 bg-gradient-to-t from-brand-500"></div>
            )}
          </div>
        </div>
        {height > 80 && (
          <button
            onClick={toggleExpand}
            className="mt-2 text-right font-bold text-brand-50 hover:underline"
          >
            {isExpanded ? 'Read less' : '...Read more'}
          </button>
        )}
        <div className="relative mt-5">
          {!!data?.media_attachments.length && (
            <Carousel className="w-full">
              <CarouselContent>
                {data?.media_attachments?.map((_, index) => (
                  <CarouselItem key={index} className="">
                    <Image
                      src={_.preview_url}
                      alt={_.description}
                      width={_.meta.small.width}
                      height={_.meta.small.height}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
          <div className="mt-10">{formatDate(post?.created_at, false)}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
