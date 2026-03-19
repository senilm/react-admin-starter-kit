import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roleService } from '@/services/role.service';
import { toast } from 'sonner';
import type { CreateRoleRequest, UpdateRoleRequest } from '@/types';

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleRequest) => roleService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role created successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to create role');
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoleRequest }) =>
      roleService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role updated successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to update role');
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => roleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role deleted successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to delete role');
    },
  });
};

export const useBulkDeleteRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => roleService.bulkDelete(ids),
    onSuccess: ({ count }) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success(`${count} role${count !== 1 ? 's' : ''} deleted successfully`);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to delete roles');
    },
  });
};
