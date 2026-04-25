import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../api/profile.api';
import { queryKeys } from '@/shared/api/queryKeys';

export function useProfile(userId: string) {
  return useQuery({
    queryKey: queryKeys.users.profile(userId),
    queryFn: () => profileApi.getProfile(userId),
    enabled: !!userId,
  });
}
