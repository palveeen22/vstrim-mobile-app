import { useQuery } from '@tanstack/react-query';
import { listsApi } from '../api/lists.api';
import { queryKeys } from '@/shared/api/queryKeys';

export function useMyLists() {
  return useQuery({
    queryKey: queryKeys.lists.mine,
    queryFn: listsApi.getMyLists,
  });
}
