import { api } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import type { User, UserStats, CreateUserRequest, UpdateUserRequest, ListUsersQuery, PaginatedData, ExportResponse } from '@/types';

export const userService = {
  getAll: (params?: ListUsersQuery) =>
    api.get<unknown, PaginatedData<User>>(API_ENDPOINTS.USERS, { params }),

  getById: (id: string) => api.get<unknown, User>(`${API_ENDPOINTS.USERS}/${id}`),

  getStats: () => api.get<unknown, UserStats>(`${API_ENDPOINTS.USERS}/stats`),

  create: (data: CreateUserRequest) => api.post<unknown, User>(API_ENDPOINTS.USERS, data),

  update: (id: string, data: UpdateUserRequest) => api.patch<unknown, User>(`${API_ENDPOINTS.USERS}/${id}`, data),

  delete: (id: string) => api.delete<unknown, void>(`${API_ENDPOINTS.USERS}/${id}`),

  bulkDelete: (ids: string[]) =>
    api.post<unknown, { count: number }>(`${API_ENDPOINTS.USERS}/bulk-delete`, { ids }),

  resendInvite: (id: string) =>
    api.post<unknown, void>(`${API_ENDPOINTS.USERS}/${id}/resend-invite`),

  exportAll: (params?: ListUsersQuery) =>
    api.get<unknown, ExportResponse<User>>(`${API_ENDPOINTS.USERS}/export`, { params }),
};
