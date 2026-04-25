export interface PlaceDetail {
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
  description: string;
  phone: string | null;
  website: string | null;
  hours: string | null;
  tags: string[];
  isSaved: boolean;
}
