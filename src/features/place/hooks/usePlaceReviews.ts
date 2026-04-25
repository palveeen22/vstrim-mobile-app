import { useInfiniteQuery } from '@tanstack/react-query';
import { placeApi } from '../api/place.api';
import { queryKeys } from '@/shared/api/queryKeys';

export function usePlaceReviews(placeId: string) {
  return useInfiniteQuery({
    queryKey: queryKeys.places.reviews(placeId),
    queryFn: ({ pageParam }) => placeApi.getReviews(placeId, pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    enabled: !!placeId,
  });
}
