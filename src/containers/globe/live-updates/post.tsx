import { Post as PostTypes } from '@/hooks/social-media';

import { PostHeader } from '@/components/social-media/post-header';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

/** The status a card is about: the boosted one when the post is a boost. */
export const getPostTarget = (post: PostTypes) => post.reblog ?? post;

/**
 * Where a card should take the reader: the page the post links to when
 * Fosstodon attached a link preview (`card.url`), otherwise the post itself.
 * A boost's own `url` is an `/activity` address, so the boosted status is read
 * in both cases.
 */
export const getPostLink = (post: PostTypes) => {
  const target = getPostTarget(post);
  const candidate = target.card?.url || target.url;
  return candidate && isHttpUrl(candidate) ? candidate : undefined;
};

/**
 * `card.url` is whatever the linked site declared about itself, relayed by
 * Fosstodon; only web addresses may end up in an `href`.
 */
const isHttpUrl = (raw: string) => {
  try {
    const { protocol } = new URL(raw);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
};

/**
 * Fosstodon marks hashtags and mentions up as links. Inside a card that is
 * itself a link they would nest `<a>` in `<a>`, which browsers split apart;
 * keep the text and drop the tags.
 */
const stripAnchors = (html: string) => html.replace(/<\/?a\b[^>]*>/gi, '');

export const Post = ({
  post,
  children,
  insideLink = false,
}: {
  post: PostTypes;
  children?: React.ReactNode;
  /** Set when the card is rendered inside an `<a>`; flattens links in the body. */
  insideLink?: boolean;
}) => {
  const data = getPostTarget(post);
  const content = insideLink ? stripAnchors(data?.content ?? '') : data?.content;

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
            {data.card?.description || <span dangerouslySetInnerHTML={{ __html: content }} />}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

export default Post;
