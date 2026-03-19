import { api } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/api-endpoints';

export type DashboardStats = {
  totalTodos: number;
  totalUsers: number;
  totalRoles: number;
  totalAudits: number;
};

export const dashboardService = {
  getStats: () =>
    api.get<unknown, DashboardStats>(API_ENDPOINTS.DASHBOARD_STATS),
};
