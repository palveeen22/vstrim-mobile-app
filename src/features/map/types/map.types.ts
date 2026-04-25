export interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  avgRating: number;
  reviewCount: number;
  coverUrl: string | null;
  distance?: number;
  photos: string[];
  tags: string[];
  savedCount: number;
  savedByAvatars: string[];
  isSaved?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}
