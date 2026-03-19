import type { ColumnDef } from '@tanstack/react-table';
import { DataTableHeader } from '@/components/data-table/data-table-header';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { ActiveStatusBadge } from '@/components/shared/active-status-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { getSelectColumn } from '@/components/data-table/data-table-select-column';
import { formatDateTime } from '@/lib/format';
import type { Role } from '@/types';

type RoleColumnActions = {
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
  canEdit?: boolean;
  canDelete?: boolean;
};

export const getRoleColumns = ({
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}: RoleColumnActions): ColumnDef<Role>[] => [
  ...(canDelete ? [getSelectColumn<Role>()] : []),
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableHeader column={column} title="Name" />,
    meta: { label: 'Name' },
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    meta: { label: 'Description' },
    cell: ({ row }) => (
      <span className="max-w-75 truncate text-muted-foreground">
        {row.getValue('description') || '\u2014'}
      </span>
    ),
  },
  {
    accessorKey: 'permissions',
    header: 'Permissions',
    meta: { label: 'Permissions' },
    cell: ({ row }) => {
      const permissions = row.getValue('permissions') as string[];
      return (
        <span className="text-muted-foreground">
          {permissions.length} {permissions.length === 1 ? 'permission' : 'permissions'}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'userCount',
    header: 'Users',
    meta: { label: 'Users' },
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue('userCount') as number}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    meta: { label: 'Status' },
    cell: ({ row }) => <ActiveStatusBadge isActive={row.getValue('isActive')} />,
    enableSorting: false,
  },
  {
    accessorKey: 'isSystem',
    header: 'Type',
    meta: { label: 'Type' },
    cell: ({ row }) => {
      const isSystem = row.getValue('isSystem') as boolean;
      return (
        <StatusBadge
          status={isSystem ? 'System' : 'Custom'}
          variant={isSystem ? 'warning' : 'default'}
        />
      );
    },
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
  {
    id: 'actions',
    cell: ({ row }) => {
      const role = row.original;
      if (role.isSystem) return null;
      return (
        <div className="flex justify-end">
          <DataTableRowActions
            onEdit={canEdit ? () => onEdit(role) : undefined}
            onDelete={canDelete ? () => onDelete(role) : undefined}
          />
        </div>
      );
    },
  },
];
