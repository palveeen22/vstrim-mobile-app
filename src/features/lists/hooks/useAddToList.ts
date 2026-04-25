import { useMutation, useQueryClient } from '@tanstack/react-query';
import { listsApi } from '../api/lists.api';
import { queryKeys } from '@/shared/api/queryKeys';
import { useAppSelector } from '@/shared/store/hooks';

export function useAddToList() {
  const qc = useQueryClient();
  const userId = useAppSelector((s) => s.authUser.user?.id ?? '');

  return useMutation({
    mutationFn: ({ listId, placeId }: { listId: string; placeId: string }) =>
      listsApi.addToList(listId, placeId),
    onSuccess: (_data, { listId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.lists.detail(listId) });
      qc.invalidateQueries({ queryKey: queryKeys.users.lists(userId) });
    },
  });
}
