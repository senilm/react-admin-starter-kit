import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100, 'First name must be under 100 characters'),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Last name must be under 100 characters'),
  email: z.string().email('Invalid email address'),
  roleId: z.string().min(1, 'Role is required'),
});

export const updateUserSchema = z.object({
  roleId: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
