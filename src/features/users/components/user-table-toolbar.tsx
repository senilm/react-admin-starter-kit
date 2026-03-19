import { useQuery } from '@tanstack/react-query';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { DataTableFilter, type FilterField } from '@/components/data-table/data-table-filter';
import { DataTableExport } from '@/components/data-table/data-table-export';
import { roleService } from '@/services/role.service';
import { QUERY_KEYS } from '@/lib/constants';
import { usePermissions } from '@/hooks/use-permissions';

type UserTableToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onFilterClear: () => void;
  activeFilterCount: number;
  onExportCSV: () => void | Promise<void>;
  onExportXLSX: () => void | Promise<void>;
  isExporting?: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  columnCustomizer?: React.ReactNode;
};

export const UserTableToolbar = ({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  onFilterClear,
  activeFilterCount,
  onExportCSV,
  onExportXLSX,
  isExporting,
  onRefresh,
  isRefreshing,
  columnCustomizer,
}: UserTableToolbarProps) => {
  const { hasPermission } = usePermissions();

  const { data: rolesData } = useQuery({
    queryKey: QUERY_KEYS.roles({}),
    queryFn: () => roleService.getAll({ limit: 100 }),
    enabled: hasPermission('roles.read'),
  });

  const filterFields: FilterField[] = [
    ...(hasPermission('roles.read')
      ? [
          {
            key: 'roleId',
            label: 'Role',
            options: (rolesData?.items ?? []).map((role) => ({
              label: role.name,
              value: role._id,
            })),
          },
        ]
      : []),
    {
      key: 'isActive',
      label: 'Status',
      options: [
        { label: 'Active', value: 'true' },
        { label: 'Inactive', value: 'false' },
      ],
    },
  ];

  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search users..."
      onRefresh={onRefresh}
      isRefreshing={isRefreshing}
      columnCustomizer={columnCustomizer}
    >
      <DataTableFilter
        fields={filterFields}
        values={filters}
        onChange={onFilterChange}
        onClear={onFilterClear}
        activeCount={activeFilterCount}
      />
      <DataTableExport
        onExportCSV={onExportCSV}
        onExportXLSX={onExportXLSX}
        isExporting={isExporting}
      />
    </DataTableToolbar>
  );
};
