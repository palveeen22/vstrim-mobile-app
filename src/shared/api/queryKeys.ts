export const queryKeys = {
  places: {
    all: ['places'] as const,
    nearby: (lat: number, lng: number, radius?: number) =>
      ['places', 'nearby', lat, lng, radius] as const,
    detail: (id: string) => ['places', id] as const,
    reviews: (id: string) => ['places', id, 'reviews'] as const,
  },
  reviews: {
    detail: (id: string) => ['reviews', id] as const,
    comments: (id: string) => ['reviews', id, 'comments'] as const,
  },
  users: {
    profile: (id: string) => ['users', id] as const,
    lists: (id: string) => ['users', id, 'lists'] as const,
    saved: (id: string) => ['users', id, 'saved'] as const,
    photos: (id: string) => ['users', id, 'photos'] as const,
    followers: (id: string) => ['users', id, 'followers'] as const,
    following: (id: string) => ['users', id, 'following'] as const,
  },
  feed: {
    all: ['feed'] as const,
  },
  lists: {
    mine: ['lists', 'mine'] as const,
    detail: (id: string) => ['lists', id] as const,
  },
} as const;
