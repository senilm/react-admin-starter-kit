import type { PaginationQuery } from './api.types';

export const AUDIT_MODULE = {
  USERS: 'users',
  ROLES: 'roles',
  PERMISSIONS: 'permissions',
  TODOS: 'todos',
  AUDITS: 'audits',
} as const;

export type AuditModule = (typeof AUDIT_MODULE)[keyof typeof AUDIT_MODULE];

export const AUDIT_ACTION = {
  CREATED: 'created',
  UPDATED: 'updated',
  DELETED: 'deleted',
} as const;

export type AuditAction = (typeof AUDIT_ACTION)[keyof typeof AUDIT_ACTION];

export type AuditLog = {
  _id: string;
  module: AuditModule;
  recordId: string;
  action: AuditAction;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  previousValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
  ipAddress: string;
  createdAt: string;
};

export type ListAuditsQuery = PaginationQuery & {
  module?: AuditModule;
  action?: AuditAction;
  recordId?: string;
  fromDate?: string;
  toDate?: string;
};
