export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  followersCount: number;
  followingCount: number;
  reviewCount: number;
  listCount: number;
  isFollowing: boolean;
  isOwnProfile: boolean;
}

export interface UserList {
  id: string;
  name: string;
  description: string | null;
  coverUrl: string | null;
  placeCount: number;
  isPublic: boolean;
  createdAt: string;
}

export interface SavedPlace {
  id: string;
  name: string;
  category: string;
  coverUrl: string | null;
  avgRating: number;
}

export interface UserPhoto {
  id: string;
  url: string;
  placeId: string;
  placeName: string;
}

export interface ListDetailPlace {
  id: string;
  name: string;
  category: string;
  coverUrl: string | null;
  avgRating: number;
  address: string;
}

export interface ListDetail {
  list: UserList;
  places: ListDetailPlace[];
}
