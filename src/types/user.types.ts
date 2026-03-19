import type { PaginationQuery } from './api.types';

export type User = {
  _id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  isActive: boolean;
  isTwoFactorEnabled: boolean;
  mustChangePassword: boolean;
  mustSetupTwoFactor: boolean;
  lastLoginAt: string | null;
  roleId: {
    _id: string;
    name: string;
    permissions: string[];
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UserStats = {
  activeUsers: { value: number };
  inactiveUsers: { value: number };
  adminCount: { value: number };
  staleUsers: { value: number };
};

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
};

export type UpdateUserRequest = {
  roleId?: string;
  isActive?: boolean;
};

export type ListUsersQuery = PaginationQuery & {
  roleId?: string;
  isActive?: string;
};
