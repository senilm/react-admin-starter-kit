import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useUserForm, UserFormFields } from './user-form';
import { useCreateUser } from '../hooks/use-user-mutations';
import type { CreateUserFormValues } from '@/validations/user.schema';

type UserCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UserCreateDialog = ({ open, onOpenChange }: UserCreateDialogProps) => {
  const { mutate: createUser, isPending } = useCreateUser();
  const form = useUserForm();

  const handleSubmit = (data: CreateUserFormValues) => {
    createUser(data, {
      onSuccess: () => handleClose(),
    });
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <UserFormFields form={form} />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="submit" loading={isPending}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
