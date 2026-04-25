import { useMutation, useQueryClient } from '@tanstack/react-query';
import { placeApi } from '../api/place.api';
import { queryKeys } from '@/shared/api/queryKeys';
import type { PlaceDetail } from '../types/place.types';

export function useSavePlace(placeId: string) {
  const qc = useQueryClient();
  const key = queryKeys.places.detail(placeId);

  function optimistic(isSaved: boolean) {
    return {
      onMutate: async () => {
        await qc.cancelQueries({ queryKey: key });
        const prev = qc.getQueryData<PlaceDetail>(key);
        qc.setQueryData<PlaceDetail>(key, (old) => (old ? { ...old, isSaved } : old));
        return { prev };
      },
      onError: (_e: unknown, _v: unknown, ctx: { prev?: PlaceDetail } | undefined) => {
        qc.setQueryData(key, ctx?.prev);
      },
      onSettled: () => qc.invalidateQueries({ queryKey: key }),
    };
  }

  const save = useMutation({
    mutationFn: () => placeApi.savePlace(placeId),
    ...optimistic(true),
  });

  const unsave = useMutation({
    mutationFn: () => placeApi.unsavePlace(placeId),
    ...optimistic(false),
  });

  return { save, unsave };
}
