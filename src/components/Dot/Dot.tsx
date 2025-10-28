import { Priority } from '@/types/Task';
import { cn } from '@/utils/cn';

const COLOR_MAP = {
  낮음: 'bg-green-500',
  보통: 'bg-yellow-500',
  중요: 'bg-red-500',
};

interface DotProps {
  priority: Priority;
  className?: string;
}

const Dot = ({ priority, className }: DotProps) => {
  return <div className={cn('h-2 w-2 rounded-full', COLOR_MAP[priority], className)} />;
};

export default Dot;
