import { Progress } from '@/components/ui/progress';

interface ProgressStatsProps {
  completed: number;
  total: number;
}

export function ProgressStats({ completed, total }: ProgressStatsProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{completed} of {total} tasks completed</span>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
