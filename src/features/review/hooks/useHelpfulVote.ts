import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '../api/review.api';
import { queryKeys } from '@/shared/api/queryKeys';
import type { Review } from '../types/review.types';

export function useHelpfulVote(reviewId: string, placeId: string) {
  const qc = useQueryClient();
  const key = queryKeys.places.reviews(placeId);

  function optimistic(isHelpful: boolean) {
    return {
      onMutate: async () => {
        await qc.cancelQueries({ queryKey: key });
        const prev = qc.getQueryData<Review[]>(key);
        qc.setQueryData<Review[]>(key, (old) =>
          old?.map((r) =>
            r.id === reviewId
              ? { ...r, isHelpful, helpfulCount: r.helpfulCount + (isHelpful ? 1 : -1) }
              : r,
          ),
        );
        return { prev };
      },
      onError: (_e: unknown, _v: unknown, ctx: { prev?: Review[] } | undefined) => {
        qc.setQueryData(key, ctx?.prev);
      },
      onSettled: () => qc.invalidateQueries({ queryKey: key }),
    };
  }

  const vote = useMutation({
    mutationFn: () => reviewApi.voteHelpful(reviewId),
    ...optimistic(true),
  });

  const unvote = useMutation({
    mutationFn: () => reviewApi.unvoteHelpful(reviewId),
    ...optimistic(false),
  });

  return { vote, unvote };
}
