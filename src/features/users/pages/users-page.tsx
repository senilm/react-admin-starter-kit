import { useState, useMemo, useCallback } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableBulkActions } from '@/components/data-table/data-table-bulk-actions';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { PermissionGate } from '@/components/shared/permission-gate';
import { Button } from '@/components/ui/button';
import { useUsers } from '../hooks/use-users';
import { useDeleteUser, useUpdateUser, useBulkDeleteUsers, useResendInvite } from '../hooks/use-user-mutations';
import { getUserColumns } from '../components/user-columns';
import { UserTableToolbar } from '../components/user-table-toolbar';
import { UserStatsOverview } from '../components/user-stats-overview';
import { useDialogStore, DIALOG_KEY } from '@/stores/dialog-store';
import { useAuthStore } from '@/stores/auth-store';
import { usePermissions } from '@/hooks/use-permissions';
import { UserEditDialog } from '../components/user-edit-dialog';
import { usePagination } from '@/hooks/use-pagination';
import { useDebounce } from '@/hooks/use-debounce';
import { useSorting } from '@/hooks/use-sorting';
import { exportToCSV, exportToXLSX } from '@/lib/export';
import { formatDateTime, formatFullName } from '@/lib/format';
import { userService } from '@/services/user.service';
import { toast } from 'sonner';
import type { User } from '@/types';

export const UsersPage = () => {
  const { page, limit, setPage, setLimit } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const { sorting, setSorting, sortBy, sortOrder } = useSorting();
  const [isExporting, setIsExporting] = useState(false);

  const { openDialog } = useDialogStore();
  const currentUserId = useAuthStore((s) => s.user?.id);
  const { hasPermission } = usePermissions();
  const canEdit = hasPermission('users.update');
  const canDelete = hasPermission('users.delete');

  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const { mutate: removeUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: bulkDelete, isPending: isBulkDeleting } = useBulkDeleteUsers();
  const { mutate: resendInvite } = useResendInvite();

  const queryParams = useMemo(() => {
    const mappedSortBy = sortBy === 'name' ? 'firstName' : sortBy;
    return {
      page,
      limit,
      ...(debouncedSearch && { s: debouncedSearch }),
      ...(filters.roleId && { roleId: filters.roleId }),
      ...(filters.isActive && { isActive: filters.isActive }),
      ...(mappedSortBy && { sortBy: mappedSortBy, sortOrder }),
    };
  }, [page, limit, debouncedSearch, filters, sortBy, sortOrder]);

  const { data, isLoading, isFetching, refetch } = useUsers(queryParams);

  const handleToggleActive = useCallback(
    (user: User, isActive: boolean) => {
      updateUser({ id: user._id, data: { isActive } });
    },
    [updateUser],
  );

  const columns = useMemo(
    () =>
      getUserColumns({
        onEdit: setEditUser,
        onDelete: setDeleteUser,
        onToggleActive: handleToggleActive,
        onResendInvite: (user) => resendInvite(user._id),
        currentUserId,
        canEdit,
        canDelete,
      }),
    [handleToggleActive, resendInvite, currentUserId, canEdit, canDelete],
  );

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1);
    },
    [setPage],
  );

  const handleFilterClear = useCallback(() => {
    setFilters({});
    setPage(1);
  }, [setPage]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const handleDelete = () => {
    if (!deleteUser) return;
    removeUser(deleteUser._id, {
      onSuccess: () => setDeleteUser(null),
    });
  };

  const handleBulkDelete = () => {
    const selectedIds = Object.keys(rowSelection);
    if (selectedIds.length === 0) return;
    bulkDelete(selectedIds, {
      onSuccess: () => {
        setRowSelection({});
        setBulkDeleteOpen(false);
      },
    });
  };

  const handleExport = async (format: 'csv' | 'xlsx') => {
    setIsExporting(true);
    try {
      const response = await userService.exportAll(queryParams);
      const exportData = response.items.map((user) => ({
        Name: formatFullName(user.firstName, user.lastName),
        Email: user.email,
        Role: user.roleId?.name ?? 'No role',
        Status: user.isActive ? 'Active' : 'Inactive',
        'Last Login': user.lastLoginAt ? formatDateTime(user.lastLoginAt) : 'Never',
        Created: formatDateTime(user.createdAt),
      }));

      if (format === 'csv') exportToCSV(exportData, 'users');
      else exportToXLSX(exportData, 'users');

      if (response.truncated) {
        toast.info(`Export limited to ${response.items.length.toLocaleString()} records`);
      }
    } catch {
      toast.error('Failed to export users');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div>
      <PageHeader title="Users" description="Manage user accounts.">
        <PermissionGate permission="users.create">
          <Button onClick={() => openDialog(DIALOG_KEY.CREATE_USER)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </PermissionGate>
      </PageHeader>

      <UserStatsOverview />

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        getRowId={(row) => row._id}
        isLoading={isLoading}
        pagination={
          data
            ? { page: data.page, limit: data.limit, total: data.total, totalPages: data.totalPages }
            : undefined
        }
        onPageChange={setPage}
        onLimitChange={setLimit}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        sorting={sorting}
        onSortingChange={setSorting}
        emptyTitle="No users found"
        emptyDescription="Get started by creating your first user."
        hasActiveFilters={!!debouncedSearch || activeFilterCount > 0}
        toolbar={(columnCustomizer) => (
          <UserTableToolbar
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            filters={filters}
            onFilterChange={handleFilterChange}
            onFilterClear={handleFilterClear}
            activeFilterCount={activeFilterCount}
            onExportCSV={() => handleExport('csv')}
            onExportXLSX={() => handleExport('xlsx')}
            isExporting={isExporting}
            onRefresh={refetch}
            isRefreshing={isFetching}
            columnCustomizer={columnCustomizer}
          />
        )}
        bulkActions={
          canDelete ? (
            <DataTableBulkActions
              selectedCount={Object.keys(rowSelection).length}
              onDelete={() => setBulkDeleteOpen(true)}
              onClear={() => setRowSelection({})}
            />
          ) : undefined
        }
      />

      <UserEditDialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)} user={editUser} />
      <ConfirmDialog
        open={!!deleteUser}
        onOpenChange={(open) => !open && setDeleteUser(null)}
        title="Delete User"
        description={`Are you sure you want to delete "${formatFullName(deleteUser?.firstName, deleteUser?.lastName)}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
      <ConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title="Delete Users"
        description={`Are you sure you want to delete ${Object.keys(rowSelection).length} selected user(s)? This action cannot be undone.`}
        confirmLabel="Delete All"
        variant="destructive"
        onConfirm={handleBulkDelete}
        isLoading={isBulkDeleting}
      />
    </div>
  );
};
