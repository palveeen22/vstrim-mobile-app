import { useQuery } from '@tanstack/react-query';
import { mapApi } from '../api/map.api';
import { queryKeys } from '@/shared/api/queryKeys';
import { useAppSelector } from '@/shared/store/hooks';

export function useNearbyPlaces(lat: number, lng: number, radius = 2000) {
  const activeCategory = useAppSelector((s) => s.map.activeCategory);

  return useQuery({
    queryKey: [...queryKeys.places.nearby(lat, lng, radius), activeCategory],
    queryFn: () => mapApi.getNearbyPlaces(lat, lng, radius),
    enabled: lat !== 0 && lng !== 0,
    staleTime: 60_000,
  });
}
