export interface FeedItem {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl: string | null;
  placeId: string;
  placeName: string;
  placeCategory: string;
  rating: number;
  text: string;
  mediaUrls: string[];
  helpfulCount: number;
  commentCount: number;
  isHelpful: boolean;
  isFollowing: boolean;
  createdAt: string;
}

export interface FeedPage {
  items: FeedItem[];
  nextCursor: string | null;
  hasMore: boolean;
}
