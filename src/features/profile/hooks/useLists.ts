import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../api/profile.api';
import { queryKeys } from '@/shared/api/queryKeys';

export function useLists(userId: string) {
  return useQuery({
    queryKey: queryKeys.users.lists(userId),
    queryFn: () => profileApi.getLists(userId),
    enabled: !!userId,
  });
}
