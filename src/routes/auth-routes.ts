import { lazy } from 'react';

export const authRoutes = [
  {
    id: 'login',
    path: '/login',
    element: lazy(() =>
      import('@/features/auth/pages/login-page').then((m) => ({ default: m.LoginPage })),
    ),
  },
  // {
  //   id: 'register',
  //   path: '/register',
  //   element: lazy(() =>
  //     import('@/features/auth/pages/register-page').then((m) => ({ default: m.RegisterPage })),
  //   ),
  // },
  {
    id: 'forgot-password',
    path: '/forgot-password',
    element: lazy(() =>
      import('@/features/auth/pages/forgot-password-page').then((m) => ({
        default: m.ForgotPasswordPage,
      })),
    ),
  },
  {
    id: 'reset-password',
    path: '/reset-password',
    element: lazy(() =>
      import('@/features/auth/pages/reset-password-page').then((m) => ({
        default: m.ResetPasswordPage,
      })),
    ),
  },
  {
    id: '2fa-verify',
    path: '/2fa-verify',
    element: lazy(() =>
      import('@/features/auth/pages/two-factor-verify-page').then((m) => ({
        default: m.TwoFactorVerifyPage,
      })),
    ),
  },
  {
    id: 'onboarding-2fa',
    path: '/onboarding/2fa-setup',
    element: lazy(() =>
      import('@/features/auth/pages/onboarding-2fa-page').then((m) => ({
        default: m.Onboarding2faPage,
      })),
    ),
  },
];
