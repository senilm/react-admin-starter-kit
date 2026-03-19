import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const TableSkeleton = ({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) => {
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-8 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-10 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="p-4.5 space-y-3 shadow-sm bg-card text-card-foreground rounded-xl border ">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-4" />
      </div>
      <Skeleton className="mt-3 h-9 w-24" />
      <Skeleton className="mt-2 h-4 w-20" />
    </div>
  );
};

export const StatsRowSkeleton = ({ count = 4 }: { count?: number } = {}) => {
  const colsClass =
    count === 5
      ? 'grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5'
      : 'grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4';
  return (
    <div className={cn('grid', colsClass)}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};
