import type { Table } from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type DataTableColumnCustomizerProps<TData> = {
  table: Table<TData>;
};

const humanize = (id: string) =>
  id.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim();

export const DataTableColumnCustomizer = <TData,>({
  table,
}: DataTableColumnCustomizerProps<TData>) => {
  const columns = table
    .getAllColumns()
    .filter((col) => col.getCanHide() && col.id !== 'select' && col.id !== 'actions');

  if (columns.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2 />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
          >
            {(column.columnDef.meta as { label?: string })?.label ?? humanize(column.id)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
