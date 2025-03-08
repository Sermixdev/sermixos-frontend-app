// API Response Types
export interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export interface CreatePostPayload {
  title: string;
  content: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// API Error Types
export interface ApiError {
  message: string;
  status?: number;
}

// API Config
export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}