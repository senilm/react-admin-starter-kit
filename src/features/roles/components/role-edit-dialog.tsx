import { useEffect } from 'react';
import {
  Dialog,
  FullScreenDialogContent,
  FullScreenDialogHeader,
  FullScreenDialogBody,
  FullScreenDialogFooter,
} from '@/components/ui/full-screen-dialog';
import { DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useRoleForm, RoleFormFields } from './role-form';
import { useUpdateRole } from '../hooks/use-role-mutations';
import { usePermissionsList } from '../hooks/use-permissions-list';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import type { CreateRoleFormValues } from '@/validations/role.schema';
import type { Role } from '@/types';

type RoleEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
};

export const RoleEditDialog = ({ open, onOpenChange, role }: RoleEditDialogProps) => {
  const { mutate: updateRole, isPending } = useUpdateRole();
  const { data: permissions, isLoading: isLoadingPermissions } = usePermissionsList();
  const form = useRoleForm(
    role
      ? {
          name: role.name,
          description: role.description ?? '',
          permissions: role.permissions,
        }
      : undefined,
  );

  useEffect(() => {
    if (role) {
      form.reset({
        name: role.name,
        description: role.description ?? '',
        permissions: role.permissions,
      });
    }
  }, [role, form]);

  if (!role) return null;

  const handleSubmit = (data: CreateRoleFormValues) => {
    updateRole(
      { id: role._id, data },
      { onSuccess: () => handleClose() },
    );
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <FullScreenDialogContent>
        {isLoadingPermissions ? (
          <div className="flex flex-1 items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col flex-1 min-h-0">
              <FullScreenDialogHeader>
                <DialogTitle>Edit Role</DialogTitle>
              </FullScreenDialogHeader>
              <FullScreenDialogBody>
                <RoleFormFields
                  form={form}
                  permissions={permissions ?? []}
                  layout="expanded"
                />
              </FullScreenDialogBody>
              <FullScreenDialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={isPending}>
                  Update
                </Button>
              </FullScreenDialogFooter>
            </form>
          </Form>
        )}
      </FullScreenDialogContent>
    </Dialog>
  );
};
