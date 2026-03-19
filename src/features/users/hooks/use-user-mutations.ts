import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { toast } from 'sonner';
import type { CreateUserRequest, UpdateUserRequest } from '@/types';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to create user');
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      userService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to update user');
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to delete user');
    },
  });
};

export const useBulkDeleteUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => userService.bulkDelete(ids),
    onSuccess: ({ count }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`${count} user${count !== 1 ? 's' : ''} deleted successfully`);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to delete users');
    },
  });
};

export const useResendInvite = () => {
  return useMutation({
    mutationFn: (id: string) => userService.resendInvite(id),
    onSuccess: () => {
      toast.success('Invite resent successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to resend invite');
    },
  });
};
