import { useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { PERMISSION_MODULES, PERMISSION_ACTIONS } from '@/lib/constants';
import { humanize } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Permission } from '@/types';

type PermissionMatrixProps = {
  permissions: Permission[];
  selectedPermissions: string[];
  onToggle: (permissionName: string) => void;
  onToggleModule?: (permissionNames: string[]) => void;
  onToggleAll?: (permissionNames: string[]) => void;
};

export const PermissionMatrix = ({
  permissions,
  selectedPermissions,
  onToggle,
  onToggleModule,
  onToggleAll,
}: PermissionMatrixProps) => {
  const permissionMap = useMemo(() => {
    const map = new Map<string, Permission>();
    for (const permission of permissions) {
      map.set(`${permission.module}.${permission.action}`, permission);
    }
    return map;
  }, [permissions]);

  const modulePermissions = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const module of PERMISSION_MODULES) {
      const names: string[] = [];
      for (const action of PERMISSION_ACTIONS) {
        const permission = permissionMap.get(`${module}.${action}`);
        if (permission) names.push(permission.name);
      }
      map.set(module, names);
    }
    return map;
  }, [permissionMap]);

  const allPermissionNames = useMemo(() => {
    return Array.from(modulePermissions.values()).flat();
  }, [modulePermissions]);

  const allSelected = allPermissionNames.length > 0 &&
    allPermissionNames.every((p) => selectedPermissions.includes(p));

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Module
              </th>
              {PERMISSION_ACTIONS.map((action) => (
                <th
                  key={action}
                  className="px-4 py-3 text-center font-medium text-muted-foreground"
                >
                  {humanize(action)}
                </th>
              ))}
              {onToggleAll && (
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                  <div className="flex flex-col items-center gap-1">
                    <span>All</span>
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={() => onToggleAll(allPermissionNames)}
                      aria-label="Toggle all permissions"
                    />
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {PERMISSION_MODULES.map((module, index) => {
              const modulePerms = modulePermissions.get(module) ?? [];
              const moduleAllSelected = modulePerms.length > 0 &&
                modulePerms.every((p) => selectedPermissions.includes(p));

              return (
                <tr
                  key={module}
                  className={cn('border-b last:border-b-0', index % 2 === 1 && 'bg-muted/30')}
                >
                  <td className="px-4 py-3 font-medium">{humanize(module)}</td>
                  {PERMISSION_ACTIONS.map((action) => {
                    const permission = permissionMap.get(`${module}.${action}`);
                    const isSelected = permission
                      ? selectedPermissions.includes(permission.name)
                      : false;

                    return (
                      <td key={action} className="px-4 py-3 text-center">
                        {permission ? (
                          <div className="flex justify-center">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => onToggle(permission.name)}
                              aria-label={`${humanize(module)} ${action}`}
                            />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">&mdash;</span>
                        )}
                      </td>
                    );
                  })}
                  {onToggleModule && (
                    <td className="px-4 py-3 text-center">
                      <Checkbox
                        checked={moduleAllSelected}
                        onCheckedChange={() => onToggleModule(modulePerms)}
                        aria-label={`Toggle all ${module} permissions`}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
