import { useQuery } from '@tanstack/react-query';
import { placeApi } from '../api/place.api';
import { queryKeys } from '@/shared/api/queryKeys';

export function usePlaceDetail(placeId: string) {
  return useQuery({
    queryKey: queryKeys.places.detail(placeId),
    queryFn: () => placeApi.getDetail(placeId),
    enabled: !!placeId,
  });
}
