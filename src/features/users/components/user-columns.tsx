import type { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { Mail } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { DataTableHeader } from '@/components/data-table/data-table-header';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { ActiveStatusBadge } from '@/components/shared/active-status-badge';
import { getSelectColumn } from '@/components/data-table/data-table-select-column';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDateTime, formatFullName } from '@/lib/format';
import type { User } from '@/types';

type UserColumnActions = {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleActive: (user: User, isActive: boolean) => void;
  onResendInvite?: (user: User) => void;
  currentUserId?: string;
  canEdit?: boolean;
  canDelete?: boolean;
};

export const getUserColumns = ({
  onEdit,
  onDelete,
  onToggleActive,
  onResendInvite,
  currentUserId,
  canEdit = true,
  canDelete = true,
}: UserColumnActions): ColumnDef<User>[] => [
  ...(canDelete ? [getSelectColumn<User>()] : []),
  {
    id: 'name',
    accessorFn: (row) => formatFullName(row.firstName, row.lastName),
    header: ({ column }) => <DataTableHeader column={column} title="Name" />,
    meta: { label: 'Name' },
    cell: ({ row }) => {
      const name = formatFullName(row.original.firstName, row.original.lastName);
      return <span className="max-w-50 truncate font-medium">{name || '—'}</span>;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableHeader column={column} title="Email" />,
    meta: { label: 'Email' },
    cell: ({ row }) => (
      <span className="max-w-62.5 truncate text-muted-foreground">
        {row.getValue('email') || '—'}
      </span>
    ),
  },
  {
    id: 'role',
    accessorFn: (row) => row.roleId?.name ?? '—',
    header: 'Role',
    meta: { label: 'Role' },
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.roleId?.name ?? '—'}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    meta: { label: 'Status' },
    enableSorting: false,
    cell: ({ row }) => {
      const user = row.original;
      const isSelf = user._id === currentUserId;
      const isSystem = user.roleId?.name === 'Super Admin';

      if (isSelf || isSystem || !canEdit) {
        return <ActiveStatusBadge isActive={user.isActive} />;
      }

      return (
        <Switch
          size="sm"
          checked={user.isActive}
          onCheckedChange={(checked) => onToggleActive(user, checked)}
        />
      );
    },
  },
  {
    accessorKey: 'lastLoginAt',
    header: 'Last Login',
    meta: { label: 'Last Login' },
    enableSorting: false,
    cell: ({ row }) => {
      const lastLogin = row.getValue('lastLoginAt') as string | null;
      if (!lastLogin) {
        return <span className="text-muted-foreground">Never</span>;
      }
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-muted-foreground cursor-default">
              {formatDistanceToNow(new Date(lastLogin), { addSuffix: true })}
            </span>
          </TooltipTrigger>
          <TooltipContent>{formatDateTime(lastLogin)}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableHeader column={column} title="Created" />,
    meta: { label: 'Created' },
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatDateTime(row.getValue('createdAt')) || '—'}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      const isSelf = user._id === currentUserId;
      if (isSelf) return null;

      const canResend = onResendInvite && user.mustChangePassword && !user.lastLoginAt;

      return (
        <div className="flex justify-end">
          <DataTableRowActions
            onEdit={canEdit ? () => onEdit(user) : undefined}
            onDelete={canDelete ? () => onDelete(user) : undefined}
            extraItems={
              canResend ? (
                <button
                  type="button"
                  className="relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden hover:bg-accent hover:text-accent-foreground w-full"
                  onClick={() => onResendInvite(user)}
                >
                  <Mail className="h-4 w-4" />
                  Resend Invite
                </button>
              ) : undefined
            }
          />
        </div>
      );
    },
  },
];
