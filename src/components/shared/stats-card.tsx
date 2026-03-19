import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  iconColor?: string;
  trend?: {
    value: string;
    label: string;
    isPositive: boolean;
  };
  subtitle?: string;
  variant?: 'default' | 'alert';
};

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
  trend,
  subtitle,
  variant = 'default',
}: StatsCardProps) => {
  return (
    <Card
      className={cn(
        'relative overflow-hidden py-0',
        variant === 'alert' && 'border-destructive/20 bg-destructive/5',
      )}
    >
      <CardContent className="px-0 p-4.5 space-y-3">
        <div className="flex items-center justify-between">
          <p
            className={cn(
              'text-sm font-medium text-muted-foreground min-h-5',
              variant === 'alert' && 'text-destructive',
            )}
          >
            {title}
          </p>
          {Icon && (
            <Icon
              className={cn(
                'size-4',
                iconColor
                  ? iconColor
                  : variant === 'alert'
                    ? 'text-destructive'
                    : 'text-muted-foreground/60',
              )}
            />
          )}
        </div>
        <p
          className={cn(
            'text-2xl font-bold leading-9 tracking-tight min-h-8',
            variant === 'alert' && 'text-destructive',
          )}
        >
          {value}
        </p>
        <div className="flex items-center min-h-4 gap-1 text-xs">
          {trend ? (
            <>
              {trend.isPositive ? (
                <TrendingUp className="size-3 text-emerald-600" />
              ) : (
                <TrendingDown className="size-3 text-red-600" />
              )}
              <span className={trend.isPositive ? 'text-emerald-600' : 'text-red-600'}>
                {trend.value}
              </span>
              <span className="text-muted-foreground">{trend.label}</span>
            </>
          ) : subtitle ? (
            <span className="text-muted-foreground">{subtitle}</span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
