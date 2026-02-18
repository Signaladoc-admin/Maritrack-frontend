export type ActionResult<T = void> =
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: string };

export interface QueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
