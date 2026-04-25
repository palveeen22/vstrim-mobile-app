import { apiClient } from '@/shared/api/client';
import type { PlaceList, CreateListPayload } from '../types/lists.types';

export const listsApi = {
  getMyLists: () =>
    apiClient.get<{ data: PlaceList[] }>('/lists/me').then((r) => r.data.data),

  createList: (payload: CreateListPayload) =>
    apiClient.post<{ data: PlaceList }>('/lists', payload).then((r) => r.data.data),

  addToList: (listId: string, placeId: string) =>
    apiClient.post(`/lists/${listId}/places`, { placeId }).then((r) => r.data),

  removeFromList: (listId: string, placeId: string) =>
    apiClient.delete(`/lists/${listId}/places/${placeId}`).then((r) => r.data),
};
