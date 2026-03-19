import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth-store';
import { ROUTES } from '@/lib/constants';
import type { LoginRequest } from '@/types';

export const useLogin = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (result) => {
      if (result.requiresTwoFactorSetup) {
        void navigate(ROUTES.ONBOARDING_2FA);
      } else if (result.requiresTwoFactor) {
        void navigate(ROUTES.TWO_FACTOR_VERIFY);
      } else {
        toast.success('Welcome back!');
        void navigate(ROUTES.DASHBOARD);
      }
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Login failed');
    },
  });
};
