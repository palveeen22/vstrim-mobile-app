import { useMutation, useQueryClient } from '@tanstack/react-query';
import { listsApi } from '../api/lists.api';
import { queryKeys } from '@/shared/api/queryKeys';
import { useAppSelector } from '@/shared/store/hooks';

export function useCreateList() {
  const qc = useQueryClient();
  const userId = useAppSelector((s) => s.authUser.user?.id ?? '');

  return useMutation({
    mutationFn: listsApi.createList,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.lists(userId) });
      qc.invalidateQueries({ queryKey: queryKeys.lists.mine });
    },
  });
}
