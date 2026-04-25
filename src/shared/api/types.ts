export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: {
    items: T[];
    nextCursor: string | null;
    hasMore: boolean;
  };
}
