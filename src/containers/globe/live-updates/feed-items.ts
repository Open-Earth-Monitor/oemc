import type { Publication } from '@/hooks/publications';
import type { Post as PostTypes } from '@/hooks/social-media';

/**
 * The live feed carousel mixes Mastodon posts with the latest publications from
 * both libraries, so slides are a tagged union rather than a list of posts.
 */
export type FeedItem =
  | { kind: 'post'; id: string; post: PostTypes }
  | { kind: 'publication'; id: string; publication: Publication };

const getTime = (date?: string | null) => (date ? new Date(date).getTime() : NaN);

/**
 * Posts and publications are interleaved by their own date, newest first, so the
 * carousel reads as a single chronological feed instead of two stacked blocks.
 * Undated entries (Zotero dates are freeform) sink to the end rather than
 * jumping to the front.
 */
export const toFeedItems = (posts?: PostTypes[], publications?: Publication[]): FeedItem[] =>
  [
    ...(publications ?? []).map((publication) => ({
      item: { kind: 'publication', id: publication.id, publication } as FeedItem,
      time: getTime(publication.date),
    })),
    ...(posts ?? []).map((post) => ({
      item: { kind: 'post', id: post.id, post } as FeedItem,
      time: getTime(post.created_at),
    })),
  ]
    .sort((a, b) => {
      if (Number.isNaN(a.time) && Number.isNaN(b.time)) return 0;
      if (Number.isNaN(a.time)) return 1;
      if (Number.isNaN(b.time)) return -1;

      return b.time - a.time;
    })
    .map(({ item }) => item);
