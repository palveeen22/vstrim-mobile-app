import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '../api/review.api';
import { queryKeys } from '@/shared/api/queryKeys';
import type { WriteReviewPayload } from '../types/review.types';

export function useWriteReview(placeId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: WriteReviewPayload) => reviewApi.writeReview(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.places.reviews(placeId) });
      qc.invalidateQueries({ queryKey: queryKeys.places.detail(placeId) });
    },
  });
}
