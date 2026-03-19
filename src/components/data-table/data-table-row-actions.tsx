import { Ellipsis, Pencil, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type DataTableRowActionsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  extraItems?: React.ReactNode;
};

export const DataTableRowActions = ({ onView, onEdit, onDelete, extraItems }: DataTableRowActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-3.5 w-3.5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32 text-xs">
        {onView && (
          <DropdownMenuItem onSelect={onView} className="text-xs [&_svg]:size-3.5">
            <Eye />
            View
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onSelect={onEdit} className="text-xs [&_svg]:size-3.5">
            <Pencil />
            Edit
          </DropdownMenuItem>
        )}
        {extraItems}
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={onDelete} className="text-xs [&_svg]:size-3.5">
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
