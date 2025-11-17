import Typography from '@/components/Typography/Typography';
import type { Goal } from '@/types';
import { cn } from '@/utils/cn';

interface GoalSelectorButtonProps {
  active: boolean;
  onClick: () => void;
  goal: Goal;
}

const GoalSelectorButton = ({ active, onClick, goal }: GoalSelectorButtonProps) => {
  const ativeStlye = active ? ' border-1 border-purple-500 bg-purple-50 text-purple-500' : 'border border-gray-200 bg-white text-gray-900';
  const activeButtonStyle = active ? 'text-purple-500' : 'text-gray-900';

  return (
    <button aria-pressed={active} onClick={onClick} className={cn(`flex w-full cursor-pointer rounded-xl border-solid p-4`, ativeStlye)}>
      <Typography variant='title3-semibold' as='p' className={activeButtonStyle}>
        {goal.name}
      </Typography>
    </button>
  );
};

export default GoalSelectorButton;
