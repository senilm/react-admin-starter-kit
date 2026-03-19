import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { DataTableFilter, type FilterField } from '@/components/data-table/data-table-filter';
import { DataTableExport } from '@/components/data-table/data-table-export';
import { ViewToggle } from '@/components/shared/view-toggle';
import { ViewMode } from '@/types/data-table.types';

const roleFilterFields: FilterField[] = [
  {
    key: 'isActive',
    label: 'Status',
    options: [
      { label: 'Active', value: 'true' },
      { label: 'Inactive', value: 'false' },
    ],
  },
  {
    key: 'isSystem',
    label: 'Type',
    options: [
      { label: 'System', value: 'true' },
      { label: 'Custom', value: 'false' },
    ],
  },
];

type RoleTableToolbarProps = {
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
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
};

export const RoleTableToolbar = ({
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
  viewMode,
  onViewModeChange,
}: RoleTableToolbarProps) => {
  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search roles..."
      onRefresh={onRefresh}
      isRefreshing={isRefreshing}
      columnCustomizer={columnCustomizer}
    >
      <DataTableFilter
        fields={roleFilterFields}
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
      <ViewToggle value={viewMode} onChange={onViewModeChange} />
    </DataTableToolbar>
  );
};
