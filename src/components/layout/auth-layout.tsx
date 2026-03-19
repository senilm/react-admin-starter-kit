import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/stores/auth-store';
import { ROUTES } from '@/lib/constants';
import { LoadingSpinner } from '../shared/loading-spinner';

export const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner className="h-screen" />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary">GPMS Enterprise</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Government Property Management System
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
