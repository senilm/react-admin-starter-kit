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
import { useCreateRole } from '../hooks/use-role-mutations';
import { usePermissionsList } from '../hooks/use-permissions-list';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import type { CreateRoleFormValues } from '@/validations/role.schema';

type RoleCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const RoleCreateDialog = ({ open, onOpenChange }: RoleCreateDialogProps) => {
  const { mutate: createRole, isPending } = useCreateRole();
  const { data: permissions, isLoading: isLoadingPermissions } = usePermissionsList();
  const form = useRoleForm();

  const handleSubmit = (data: CreateRoleFormValues) => {
    createRole(data, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
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
                <DialogTitle>Create Role</DialogTitle>
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
                  Create
                </Button>
              </FullScreenDialogFooter>
            </form>
          </Form>
        )}
      </FullScreenDialogContent>
    </Dialog>
  );
};
