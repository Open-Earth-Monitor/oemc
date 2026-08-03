import type { Publication } from '@/hooks/publications';
import type { Post as PostTypes } from '@/hooks/social-media';

/**
 * The live feed carousel mixes Mastodon posts with the latest publication from
 * each library, so slides are a tagged union rather than a list of posts.
 */
export type FeedItem =
  | { kind: 'post'; id: string; post: PostTypes }
  | { kind: 'publication'; id: string; publication: Publication };

/**
 * Publications lead the carousel: there are only two of them and they would
 * otherwise sit behind ~20 social posts where nobody scrolls to.
 */
export const toFeedItems = (posts?: PostTypes[], publications?: Publication[]): FeedItem[] => [
  ...(publications ?? []).map(
    (publication): FeedItem => ({
      kind: 'publication',
      id: publication.id,
      publication,
    })
  ),
  ...(posts ?? []).map((post): FeedItem => ({ kind: 'post', id: post.id, post })),
];
