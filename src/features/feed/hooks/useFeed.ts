import { useInfiniteQuery } from '@tanstack/react-query';
import { feedApi } from '../api/feed.api';
import { queryKeys } from '@/shared/api/queryKeys';

export function useFeed() {
  return useInfiniteQuery({
    queryKey: queryKeys.feed.all,
    queryFn: ({ pageParam }) => feedApi.getFeed(pageParam as string | undefined),
    getNextPageParam: (last) => (last.hasMore ? (last.nextCursor ?? undefined) : undefined),
    initialPageParam: undefined as string | undefined,
  });
}
