export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl: string | null;
  placeId: string;
  rating: number;
  text: string;
  mediaUrls: string[];
  helpfulCount: number;
  commentCount: number;
  isHelpful: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl: string | null;
  text: string;
  createdAt: string;
}

export interface WriteReviewPayload {
  placeId: string;
  rating: number;
  text: string;
  mediaIds: string[];
}
