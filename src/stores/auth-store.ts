import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/services/auth.service';
import type { UserProfile, LoginRequest, RegisterRequest } from '@/types';

type AuthState = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;
};

type AuthActions = {
  login: (data: LoginRequest) => Promise<{ requiresTwoFactor: boolean; requiresTwoFactorSetup: boolean }>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  verifyTwoFactor: (token: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      hasHydrated: false,

      login: async (data) => {
        const response = await authService.login(data);

        if (response.requiresTwoFactorSetup) {
          return { requiresTwoFactor: false, requiresTwoFactorSetup: true };
        }

        if (response.requiresTwoFactor) {
          return { requiresTwoFactor: true, requiresTwoFactorSetup: false };
        }

        const user = await authService.getProfile();
        set({ user, isAuthenticated: true });

        return { requiresTwoFactor: false, requiresTwoFactorSetup: false };
      },

      register: async (data) => {
        await authService.register(data);
      },

      logout: async () => {
        try {
          await authService.logout();
        } catch {
          // Ignore errors on logout
        } finally {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      verifyTwoFactor: async (token) => {
        await authService.authenticateTwoFactor({ token });

        const user = await authService.getProfile();
        set({ user, isAuthenticated: true });
      },

      refreshProfile: async () => {
        if (!get().isAuthenticated) {
          set({ isLoading: false });
          return;
        }

        try {
          const user = await authService.getProfile();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          useAuthStore.setState({
            hasHydrated: true,
            isLoading: state.isAuthenticated,
          });
        }
      },
    },
  ),
);
