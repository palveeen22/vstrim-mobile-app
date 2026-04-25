import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../api/profile.api';
import { queryKeys } from '@/shared/api/queryKeys';

export function useListDetail(listId: string) {
  return useQuery({
    queryKey: queryKeys.lists.detail(listId),
    queryFn: () => profileApi.getListDetail(listId),
    enabled: !!listId,
  });
}
