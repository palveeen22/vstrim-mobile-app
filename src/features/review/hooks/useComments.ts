import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '../api/review.api';
import { queryKeys } from '@/shared/api/queryKeys';

export function useComments(reviewId: string) {
  const qc = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: queryKeys.reviews.comments(reviewId),
    queryFn: ({ pageParam }) => reviewApi.getComments(reviewId, pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    enabled: !!reviewId,
  });

  const addComment = useMutation({
    mutationFn: (text: string) => reviewApi.addComment(reviewId, text),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.reviews.comments(reviewId) }),
  });

  return { ...query, addComment };
}
