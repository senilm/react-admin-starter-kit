import { UserCheck, UserX, ShieldCheck, UserMinus } from 'lucide-react';
import { StatsCard } from '@/components/shared/stats-card';
import { StatsRowSkeleton } from '@/components/shared/loading-skeleton';
import { LoadingTransition } from '@/components/shared/loading-transition';
import { useUserStats } from '../hooks/use-user-stats';

export const UserStatsOverview = () => {
  const { data: stats, isLoading } = useUserStats();

  return (
    <LoadingTransition isLoading={isLoading} loader={<StatsRowSkeleton />}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatsCard
          title="Active Users"
          value={stats?.activeUsers.value ?? 0}
          icon={UserCheck}
          subtitle="Currently enabled accounts"
        />
        <StatsCard
          title="Inactive Users"
          value={stats?.inactiveUsers.value ?? 0}
          icon={UserX}
          subtitle="Disabled accounts"
        />
        <StatsCard
          title="Admin Users"
          value={stats?.adminCount.value ?? 0}
          icon={ShieldCheck}
          subtitle="Full system access"
        />
        <StatsCard
          title="No Login (30+ Days)"
          value={stats?.staleUsers.value ?? 0}
          icon={UserMinus}
          variant="alert"
          subtitle="May need follow-up"
        />
      </div>
    </LoadingTransition>
  );
};
