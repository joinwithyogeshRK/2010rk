import { Badge } from '@/components/ui/badge';

interface CategoryBadgeProps {
  name: string;
  color?: string;
}

export function CategoryBadge({ name, color = 'default' }: CategoryBadgeProps) {
  const getColorClass = () => {
    switch (color) {
      case 'red':
        return 'bg-error text-error-foreground hover:bg-error/80';
      case 'green':
        return 'bg-success text-success-foreground hover:bg-success/80';
      case 'blue':
        return 'bg-primary text-primary-foreground hover:bg-primary/80';
      case 'yellow':
        return 'bg-warning text-warning-foreground hover:bg-warning/80';
      case 'purple':
        return 'bg-accent text-accent-foreground hover:bg-accent/80';
      default:
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
    }
  };

  return (
    <Badge className={getColorClass()}>
      {name}
    </Badge>
  );
}
