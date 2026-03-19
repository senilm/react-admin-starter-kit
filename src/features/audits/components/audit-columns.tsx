import type { ColumnDef } from '@tanstack/react-table';
import { DataTableHeader } from '@/components/data-table/data-table-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDateTime, humanize } from '@/lib/format';
import { AUDIT_ACTION_VARIANT_MAP } from '@/lib/audit-utils';
import type { AuditLog, AuditAction } from '@/types';

export const auditColumns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: 'userName',
    header: ({ column }) => <DataTableHeader column={column} title="User Name" />,
    meta: { label: 'User Name' },
    cell: ({ row }) => (
      <span className="max-w-50 truncate font-medium">{row.getValue('userName') || '-'}</span>
    ),
  },
  {
    accessorKey: 'userEmail',
    header: 'Email',
    meta: { label: 'Email' },
    cell: ({ row }) => (
      <span className="max-w-62.5 truncate text-muted-foreground">
        {row.getValue('userEmail') || '-'}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'module',
    header: 'Module',
    meta: { label: 'Module' },
    cell: ({ row }) => (
      <StatusBadge status={humanize(row.getValue('module'))} variant="default" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'action',
    header: 'Action',
    meta: { label: 'Action' },
    cell: ({ row }) => {
      const action = row.getValue('action') as AuditAction;
      const { variant, label } = AUDIT_ACTION_VARIANT_MAP[action] ?? { variant: 'default' as const, label: humanize(action) };
      return <StatusBadge status={label} variant={variant} />;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'ipAddress',
    header: 'IP Address',
    meta: { label: 'IP Address' },
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue('ipAddress') || '-'}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableHeader column={column} title="Created" />,
    meta: { label: 'Created' },
    cell: ({ row }) => (
      <span className="text-muted-foreground">{formatDateTime(row.getValue('createdAt'))}</span>
    ),
  },
];
