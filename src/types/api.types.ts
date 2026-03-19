export type ApiResponse<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: {
    statusCode: number;
    message: string | string[];
  };
};

export type PaginatedData<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ExportResponse<T> = {
  items: T[];
  total: number;
  truncated: boolean;
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export type PaginationQuery = {
  page?: number;
  limit?: number;
  s?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
};
