import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRoleSchema, type CreateRoleFormValues } from '@/validations/role.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { PermissionMatrix } from './permission-matrix';
import type { Permission } from '@/types';

const getModule = (permissionName: string) => permissionName.split('.')[0];
const getAction = (permissionName: string) => permissionName.split('.')[1];

const applyDependencyRules = (
  updated: string[],
  allPermissions: Permission[],
  toggledName: string,
  wasSelected: boolean,
) => {
  const module = getModule(toggledName);
  const action = getAction(toggledName);

  if (wasSelected && action === 'read') {
    // Deselecting read → remove all other actions for this module
    return updated.filter(
      (p) => getModule(p) !== module || getAction(p) === 'read' || !['create', 'update', 'delete'].includes(getAction(p)),
    ).filter((p) => p !== toggledName);
  }

  if (!wasSelected && action !== 'read') {
    // Selecting create/update/delete → auto-select read for this module
    const readPerm = allPermissions.find(
      (p) => p.module === module && p.action === 'read',
    );
    if (readPerm && !updated.includes(readPerm.name)) {
      return [...updated, readPerm.name];
    }
  }

  return updated;
};

export const useRoleForm = (defaultValues?: Partial<CreateRoleFormValues>) => {
  return useForm<CreateRoleFormValues>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: [],
      ...defaultValues,
    },
  });
};

type RoleFormFieldsProps = {
  form: UseFormReturn<CreateRoleFormValues>;
  permissions: Permission[];
  layout?: 'compact' | 'expanded';
};

export const RoleFormFields = ({
  form,
  permissions,
  layout = 'compact',
}: RoleFormFieldsProps) => {
  const handlePermissionToggle = (permissionName: string) => {
    const current = form.getValues('permissions');
    const wasSelected = current.includes(permissionName);
    let updated = wasSelected
      ? current.filter((p) => p !== permissionName)
      : [...current, permissionName];
    updated = applyDependencyRules(updated, permissions, permissionName, wasSelected);
    form.setValue('permissions', updated, { shouldValidate: true });
  };

  const handleToggleModule = (permissionNames: string[]) => {
    const current = form.getValues('permissions');
    const allSelected = permissionNames.every((p) => current.includes(p));
    // Select all or deselect all — no partial dependency logic needed
    const updated = allSelected
      ? current.filter((p) => !permissionNames.includes(p))
      : [...new Set([...current, ...permissionNames])];
    form.setValue('permissions', updated, { shouldValidate: true });
  };

  const handleToggleAll = (permissionNames: string[]) => {
    const current = form.getValues('permissions');
    const allSelected = permissionNames.every((p) => current.includes(p));
    const updated = allSelected
      ? current.filter((p) => !permissionNames.includes(p))
      : [...new Set([...current, ...permissionNames])];
    form.setValue('permissions', updated, { shouldValidate: true });
  };

  const roleDetailsFields = (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter role name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter description (optional)" rows={3} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const permissionsField = (
    <FormField
      control={form.control}
      name="permissions"
      render={() => (
        <FormItem>
          {layout === 'expanded' && (
            <FormLabel className="text-base font-semibold">Permissions</FormLabel>
          )}
          {layout === 'compact' && <FormLabel>Permissions</FormLabel>}
          <PermissionMatrix
            permissions={permissions}
            selectedPermissions={form.watch('permissions')}
            onToggle={handlePermissionToggle}
            onToggleModule={handleToggleModule}
            onToggleAll={handleToggleAll}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );

  if (layout === 'expanded') {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div>
          <h3 className="text-base font-semibold mb-4">Role Details</h3>
          {roleDetailsFields}
        </div>
        <div>{permissionsField}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {roleDetailsFields}
      {permissionsField}
    </div>
  );
};

type RoleFormProps = {
  defaultValues?: Partial<CreateRoleFormValues>;
  onSubmit: (data: CreateRoleFormValues) => void;
  isPending: boolean;
  submitLabel?: string;
  permissions: Permission[];
};

export const RoleForm = ({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel = 'Save',
  permissions,
}: RoleFormProps) => {
  const form = useRoleForm(defaultValues);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <RoleFormFields form={form} permissions={permissions} layout="compact" />
        <div className="flex justify-end gap-2 pt-2">
          <Button type="submit" loading={isPending}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
