import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { APISocialMedia } from 'services/api';

export type MediaAttachment = {
  preview_url: string;
  description: string;
  meta: {
    small: {
      width: number;
      height: number;
    };
  };
};

export type Account = {
  display_name: string;
  username: string;
  avatar_static: string;
};

export type Card = {
  /** The page the post links to. Fosstodon sends it only when a preview card exists. */
  url?: string;
  title: string;
  description?: string;
};

export type Reblog = {
  id: string;
  card: Card | null;
  url: string;
  content: string;
  account: Account;
  media_attachments: MediaAttachment[];
};

export type Post = {
  id: string;
  created_at: string;
  content: string;
  url: string;
  card: Card | null;
  account: Account;
  /** Set on a boost; the wrapper then has empty `content`, no card and an `/activity` url. */
  reblog?: Reblog | null;
  media_attachments: MediaAttachment[];
};

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};
export function useSocialMedia(params?: unknown, queryOptions?: UseQueryOptions<Post[], Error>) {
  const fetchFosstodonPosts = () =>
    APISocialMedia.request({
      method: 'GET',
      url: '/accounts/323362/statuses',
      params,
    }).then((response: AxiosResponse<Post[]>) => response.data);
  return useQuery(['social-media', params], fetchFosstodonPosts, {
    ...DEFAULT_QUERY_OPTIONS,
    ...queryOptions,
  });
}
