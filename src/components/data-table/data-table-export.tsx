import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type DataTableExportProps = {
  onExportCSV: () => void | Promise<void>;
  onExportXLSX: () => void | Promise<void>;
  isExporting?: boolean;
};

export const DataTableExport = ({
  onExportCSV,
  onExportXLSX,
  isExporting,
}: DataTableExportProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" loading={isExporting}>
          <Download />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onExportCSV} disabled={isExporting}>
          In .CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onExportXLSX} disabled={isExporting}>
          In .XLSX
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
