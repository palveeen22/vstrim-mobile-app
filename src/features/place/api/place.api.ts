import { apiClient } from '@/shared/api/client';
import type { PlaceDetail } from '../types/place.types';
import type { Review } from '@/features/review/types/review.types';

export const placeApi = {
  getDetail: (placeId: string) =>
    apiClient.get<{ data: PlaceDetail }>(`/places/${placeId}`).then((r) => r.data.data),

  getReviews: (placeId: string, cursor?: string) =>
    apiClient
      .get<{ data: { items: Review[]; nextCursor: string | null; hasMore: boolean } }>(
        `/places/${placeId}/reviews`,
        { params: { cursor } },
      )
      .then((r) => r.data.data),

  savePlace: (placeId: string) =>
    apiClient.post(`/places/${placeId}/save`).then((r) => r.data),

  unsavePlace: (placeId: string) =>
    apiClient.delete(`/places/${placeId}/save`).then((r) => r.data),

  createPlace: (data: {
    name: string;
    category: string;
    address: string;
    lat: number;
    lng: number;
    description?: string;
  }) => apiClient.post<{ data: PlaceDetail }>('/places', data).then((r) => r.data.data),
};
