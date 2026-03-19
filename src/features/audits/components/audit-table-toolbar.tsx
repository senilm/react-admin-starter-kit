import { useMemo } from 'react';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { DataTableFilter, type FilterField } from '@/components/data-table/data-table-filter';
import { DataTableExport } from '@/components/data-table/data-table-export';
import { AUDIT_MODULE, AUDIT_ACTION } from '@/types';
import { humanize } from '@/lib/format';
import { useAuthStore } from '@/stores/auth-store';

type AuditTableToolbarProps = {
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

export const AuditTableToolbar = ({
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
}: AuditTableToolbarProps) => {
  const permissions = useAuthStore((state) => state.user?.role?.permissions ?? []);

  const auditFilterFields: FilterField[] = useMemo(() => {
    const allowedModules = Object.values(AUDIT_MODULE).filter((mod) =>
      permissions.includes(`${mod}.read`),
    );

    return [
      {
        key: 'module',
        label: 'Module',
        options: allowedModules.map((value) => ({
          label: humanize(value),
          value,
        })),
      },
      {
        key: 'action',
        label: 'Action',
        options: Object.values(AUDIT_ACTION).map((value) => ({
          label: humanize(value),
          value,
        })),
      },
      {
        key: 'date',
        label: 'Date Range',
        type: 'dateRange' as const,
        fromKey: 'fromDate',
        toKey: 'toDate',
      },
    ];
  }, [permissions]);

  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search by user name..."
      onRefresh={onRefresh}
      isRefreshing={isRefreshing}
      columnCustomizer={columnCustomizer}
    >
      <DataTableFilter
        fields={auditFilterFields}
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
