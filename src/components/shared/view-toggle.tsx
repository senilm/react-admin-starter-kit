import { List, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewMode } from '@/types/data-table.types';

type ViewToggleProps = {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
};

export const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center rounded-md border">
      <Button
        variant={view === ViewMode.LIST ? 'secondary' : 'ghost'}
        size="icon-sm"
        className="rounded-r-none border-0"
        onClick={() => onViewChange(ViewMode.LIST)}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant={view === ViewMode.GRID ? 'secondary' : 'ghost'}
        size="icon-sm"
        className="rounded-l-none border-0"
        onClick={() => onViewChange(ViewMode.GRID)}
        aria-label="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  );
};
