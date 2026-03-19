import { useState } from 'react';
import { ChevronDown, ChevronUp, Users, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ActiveStatusBadge } from '@/components/shared/active-status-badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Role } from '@/types';

type RoleCardProps = {
  role: Role;
  onEdit?: (role: Role) => void;
  onDelete?: (role: Role) => void;
};

export const RoleCard = ({ role, onEdit, onDelete }: RoleCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const maxVisible = 6;
  const visiblePermissions = expanded ? role.permissions : role.permissions.slice(0, maxVisible);
  const hasMore = role.permissions.length > maxVisible;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold leading-none">{role.name}</h3>
            <ActiveStatusBadge isActive={role.isActive} />
            {role.isSystem && <Badge variant="outline">System</Badge>}
          </div>
          {role.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{role.description}</p>
          )}
        </div>
        {!role.isSystem && (onEdit || onDelete) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(role)}>
                  <Pencil className="h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(role)}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {role.userCount} {role.userCount === 1 ? 'user' : 'users'}
          </span>
          <span>{role.permissions.length} permissions</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {visiblePermissions.map((perm) => (
            <Badge key={perm} variant="secondary" className="text-xs">
              {perm}
            </Badge>
          ))}
        </div>
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-muted-foreground"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>Show less <ChevronUp className="ml-1 h-3 w-3" /></>
            ) : (
              <>+{role.permissions.length - maxVisible} more <ChevronDown className="ml-1 h-3 w-3" /></>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
