import { apiClient } from '@/shared/api/client';
import type { Review, Comment, WriteReviewPayload } from '../types/review.types';

export const reviewApi = {
  writeReview: (payload: WriteReviewPayload) =>
    apiClient.post<{ data: Review }>('/reviews', payload).then((r) => r.data.data),

  getComments: (reviewId: string, cursor?: string) =>
    apiClient
      .get<{ data: { items: Comment[]; nextCursor: string | null; hasMore: boolean } }>(
        `/reviews/${reviewId}/comments`,
        { params: { cursor } },
      )
      .then((r) => r.data.data),

  addComment: (reviewId: string, text: string) =>
    apiClient
      .post<{ data: Comment }>(`/reviews/${reviewId}/comments`, { text })
      .then((r) => r.data.data),

  voteHelpful: (reviewId: string) =>
    apiClient.post(`/reviews/${reviewId}/helpful`).then((r) => r.data),

  unvoteHelpful: (reviewId: string) =>
    apiClient.delete(`/reviews/${reviewId}/helpful`).then((r) => r.data),
};
