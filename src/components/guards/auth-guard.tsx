import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/stores/auth-store';
import { ROUTES } from '@/lib/constants';
import { LoadingSpinner } from '../shared/loading-spinner';

export const AuthGuard = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner className=" h-screen" />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};
