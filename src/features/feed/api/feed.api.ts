import { apiClient } from '@/shared/api/client';
import type { FeedPage } from '../types/feed.types';

export const feedApi = {
  getFeed: (cursor?: string) =>
    apiClient
      .get<{ data: FeedPage }>('/feed', { params: cursor ? { cursor } : undefined })
      .then((r) => r.data.data),
};
