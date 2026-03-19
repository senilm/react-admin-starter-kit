import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ReviewItem = {
  label: string;
  value: React.ReactNode | undefined | null;
};

type ReviewSectionProps = {
  title: string;
  items: ReviewItem[];
};

export const ReviewSection = ({ title, items }: ReviewSectionProps) => {
  const filledItems = items.filter((item) => {
    if (item.value === undefined || item.value === null) return false;
    if (typeof item.value === 'string') return item.value.trim() !== '';
    if (typeof item.value === 'number') return true;
    return true;
  });

  if (filledItems.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-3">
        {filledItems.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">{item.label}</span>
            <span className="text-sm wrap-break-word">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
