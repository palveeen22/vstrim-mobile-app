export interface PlaceList {
  id: string;
  name: string;
  description: string | null;
  coverUrl: string | null;
  placeCount: number;
  isPublic: boolean;
  createdAt: string;
}

export interface CreateListPayload {
  name: string;
  description?: string;
  isPublic: boolean;
}
