import { StatusBadge } from '@/components/shared/status-badge';

type ActiveStatusBadgeProps = {
  isActive: boolean;
};

export const ActiveStatusBadge = ({ isActive }: ActiveStatusBadgeProps) => (
  <StatusBadge
    status={isActive ? 'Active' : 'Inactive'}
    variant={isActive ? 'success' : 'destructive'}
  />
);
