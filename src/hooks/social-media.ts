import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { orderBy } from 'lodash-es';

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
  title: string;
};

export type Reblog = {
  card: Card;
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
  card: Card;
  account: Account;
  reblog?: Reblog;
  media_attachments: MediaAttachment[];
};

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};
export function useSocialMedia(params?: unknown) {
  const fetchFosstodonPosts = () =>
    APISocialMedia.request({
      method: 'GET',
      url: '/accounts/323362/statuses',
      params,
    }).then((response: AxiosResponse<Post[]>) => response.data);
  return useQuery(['social-media', params], fetchFosstodonPosts, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => orderBy(data, 'created_at', 'desc').slice(0, 4),
  });
}
