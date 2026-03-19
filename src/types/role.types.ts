import type { PaginationQuery } from './api.types';

export type Role = {
  _id: string;
  name: string;
  description: string | null;
  permissions: string[];
  isSystem: boolean;
  isActive: boolean;
  userCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateRoleRequest = {
  name: string;
  description?: string;
  permissions: string[];
};

export type UpdateRoleRequest = {
  name?: string;
  description?: string;
  permissions?: string[];
  isActive?: boolean;
};

export type ListRolesQuery = PaginationQuery & {
  isActive?: string;
  isSystem?: string;
};

export type Permission = {
  _id: string;
  name: string;
  module: string;
  action: string;
  description: string | null;
};
