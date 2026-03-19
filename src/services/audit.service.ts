import { api } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import type { AuditLog, ListAuditsQuery, PaginatedData, ExportResponse } from '@/types';

export const auditService = {
  getAll: (params?: ListAuditsQuery) =>
    api.get<unknown, PaginatedData<AuditLog>>(API_ENDPOINTS.AUDITS, { params }),

  getById: (id: string) =>
    api.get<unknown, AuditLog>(`${API_ENDPOINTS.AUDITS}/${id}`),

  exportAll: (params?: ListAuditsQuery) =>
    api.get<unknown, ExportResponse<AuditLog>>(`${API_ENDPOINTS.AUDITS}/export`, { params }),
};
