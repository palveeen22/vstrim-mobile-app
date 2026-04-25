import { apiClient } from '@/shared/api/client';
import type { UserProfile, UserList, SavedPlace, UserPhoto, ListDetail } from '../types/profile.types';

export const profileApi = {
  getProfile: (userId: string) =>
    apiClient.get<{ data: UserProfile }>(`/users/${userId}`).then((r) => r.data.data),

  getLists: (userId: string) =>
    apiClient.get<{ data: UserList[] }>(`/users/${userId}/lists`).then((r) => r.data.data),

  getSaved: (userId: string, cursor?: string) =>
    apiClient
      .get<{ data: { items: SavedPlace[]; nextCursor: string | null; hasMore: boolean } }>(
        `/users/${userId}/saved`,
        { params: cursor ? { cursor } : undefined },
      )
      .then((r) => r.data.data),

  getPhotos: (userId: string, cursor?: string) =>
    apiClient
      .get<{ data: { items: UserPhoto[]; nextCursor: string | null; hasMore: boolean } }>(
        `/users/${userId}/photos`,
        { params: cursor ? { cursor } : undefined },
      )
      .then((r) => r.data.data),

  getListDetail: (listId: string) =>
    apiClient.get<{ data: ListDetail }>(`/lists/${listId}`).then((r) => r.data.data),

  follow: (userId: string) =>
    apiClient.post(`/users/${userId}/follow`).then((r) => r.data),

  unfollow: (userId: string) =>
    apiClient.delete(`/users/${userId}/follow`).then((r) => r.data),
};
