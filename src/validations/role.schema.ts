import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z.string().min(1, 'Role name is required').max(100, 'Name must be under 100 characters'),
  description: z.string().max(500, 'Description must be under 500 characters').optional(),
  permissions: z.array(z.string()).min(1, 'At least one permission is required'),
});

export const updateRoleSchema = z.object({
  name: z.string().min(1, 'Role name is required').max(100, 'Name must be under 100 characters').optional(),
  description: z.string().max(500, 'Description must be under 500 characters').optional(),
  permissions: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export type CreateRoleFormValues = z.infer<typeof createRoleSchema>;
export type UpdateRoleFormValues = z.infer<typeof updateRoleSchema>;
