import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api/profile.api';
import { queryKeys } from '@/shared/api/queryKeys';
import type { UserProfile } from '../types/profile.types';

export function useFollow(userId: string) {
  const qc = useQueryClient();
  const key = queryKeys.users.profile(userId);

  function optimistic(isFollowing: boolean) {
    return {
      onMutate: async () => {
        await qc.cancelQueries({ queryKey: key });
        const prev = qc.getQueryData<UserProfile>(key);
        qc.setQueryData<UserProfile>(key, (old) =>
          old
            ? {
                ...old,
                isFollowing,
                followersCount: old.followersCount + (isFollowing ? 1 : -1),
              }
            : old,
        );
        return { prev };
      },
      onError: (_e: unknown, _v: unknown, ctx: { prev?: UserProfile } | undefined) => {
        qc.setQueryData(key, ctx?.prev);
      },
      onSettled: () => qc.invalidateQueries({ queryKey: key }),
    };
  }

  const follow = useMutation({
    mutationFn: (_v?: void) => profileApi.follow(userId),
    ...optimistic(true),
  });

  const unfollow = useMutation({
    mutationFn: (_v?: void) => profileApi.unfollow(userId),
    ...optimistic(false),
  });

  return { follow, unfollow };
}
