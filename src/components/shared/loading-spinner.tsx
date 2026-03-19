import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

type LoadingSpinnerProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export const LoadingSpinner = ({ className, size = 'sm' }: LoadingSpinnerProps) => {
  return (
    <div className={cn('flex items-center justify-center py-8', className)}>
      <Loader className={cn('animate-spin text-primary', sizeClasses[size])} />
    </div>
  );
};
