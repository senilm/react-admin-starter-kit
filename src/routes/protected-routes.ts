import { lazy } from 'react';

export const onboardingRoutes = [
  {
    id: 'onboarding-password',
    path: '/onboarding/change-password',
    element: lazy(() =>
      import('@/features/auth/pages/onboarding-password-page').then((m) => ({
        default: m.OnboardingPasswordPage,
      })),
    ),
  },
];

export const appRoutes = [
  {
    id: 'dashboard',
    index: true,
    element: lazy(() =>
      import('@/features/dashboard/pages/dashboard-page').then((m) => ({
        default: m.DashboardPage,
      })),
    ),
  },
  {
    id: 'todos',
    path: '/todos',
    permission: 'todos.read',
    element: lazy(() =>
      import('@/features/todos/pages/todos-page').then((m) => ({ default: m.TodosPage })),
    ),
  },
  {
    id: 'users',
    path: '/users',
    permission: 'users.read',
    element: lazy(() =>
      import('@/features/users/pages/users-page').then((m) => ({ default: m.UsersPage })),
    ),
  },
  {
    id: 'roles',
    path: '/roles',
    permission: 'roles.read',
    element: lazy(() =>
      import('@/features/roles/pages/roles-page').then((m) => ({ default: m.RolesPage })),
    ),
  },
  {
    id: 'audits',
    path: '/audits',
    permission: 'audits.read',
    element: lazy(() =>
      import('@/features/audits/pages/audits-page').then((m) => ({ default: m.AuditsPage })),
    ),
  },
  {
    id: 'settings',
    path: '/settings',
    element: lazy(() =>
      import('@/features/settings/pages/settings-page').then((m) => ({ default: m.SettingsPage })),
    ),
  },
];
