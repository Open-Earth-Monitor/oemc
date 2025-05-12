import { useState, useEffect, useRef } from 'react';

import Image from 'next/image';

import { Post as PostTypes } from '@/hooks/social-media';

export const PostHeader = ({ post }: { post: PostTypes }) => {
  const [, setHeight] = useState(130);
  const [, setShowReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
      setShowReadMore(contentRef.current.scrollHeight > 130);
    }
  }, []);

  const data = post?.reblog || post;

  return (
    <div className="flex items-center space-x-4">
      <Image
        src={data?.account.avatar_static}
        alt={data?.account.display_name || data.id}
        width={56}
        height={56}
        className="shrink-0 rounded-full"
      />
      <div className="font-medium text-white-500">
        <h4 className="w-1/2">
          {post?.reblog?.account.display_name || post?.account.display_name}
        </h4>
        <span className="text-accent-green">@{data?.account.username}</span>
      </div>
    </div>
  );
};

export default PostHeader;
