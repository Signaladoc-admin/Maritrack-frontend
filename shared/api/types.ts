export type ActionResult<T = void> =
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: string };

export type ApiResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
  accessToken?: string | null;
};

export interface QueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BaseEntity {
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
}

export type QueryResult<T> =
  | { status: "success"; data: T; error: never; isLoading: false }
  | { status: "error"; data: null; error: string; isLoading: false }
  | { status: "loading"; data: null; error: string | null; isLoading: true }

export interface MessageResponse {
  message: string
}
export interface CreatedItemResponse {
  id: string
}