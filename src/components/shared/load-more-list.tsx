import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from './loading-spinner';

type LoadMoreListProps<T> = {
  items: T[];
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
};

export const LoadMoreList = <T,>({
  items,
  hasMore,
  isLoading,
  onLoadMore,
  renderItem,
  emptyMessage = 'No items found',
  className,
}: LoadMoreListProps<T>) => {
  if (!isLoading && items.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item, index) => renderItem(item, index))}
      {isLoading && (
        <LoadingSpinner/>
      )}
      {hasMore && !isLoading && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mx-auto"
          onClick={onLoadMore}
        >
          Load more
        </Button>
      )}
    </div>
  );
};
