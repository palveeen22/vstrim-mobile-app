import { apiClient } from '@/shared/api/client';
import type { Place } from '../types/map.types';

export const mapApi = {
  getNearbyPlaces: (lat: number, lng: number, radius: number) =>
    apiClient
      .get<{ data: Place[] }>('/places/nearby', { params: { lat, lng, radius } })
      .then((r) => r.data.data),

  searchPlaces: (query: string, lat?: number, lng?: number) =>
    apiClient
      .get<{ data: Place[] }>('/places/search', { params: { q: query, lat, lng } })
      .then((r) => r.data.data),
};
