import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';

export const useUserStats = () => {
  return useQuery({
    queryKey: ['users', 'stats'],
    queryFn: () => userService.getStats(),
  });
};
