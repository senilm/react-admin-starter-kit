import type { AuditAction } from '@/types/audit.types';
import { AUDIT_ACTION } from '@/types/audit.types';

export const AUDIT_ACTION_VARIANT_MAP: Record<
  AuditAction,
  { variant: 'info' | 'warning' | 'destructive'; label: string }
> = {
  [AUDIT_ACTION.CREATED]: { variant: 'info', label: 'Created' },
  [AUDIT_ACTION.UPDATED]: { variant: 'warning', label: 'Updated' },
  [AUDIT_ACTION.DELETED]: { variant: 'destructive', label: 'Deleted' },
};
