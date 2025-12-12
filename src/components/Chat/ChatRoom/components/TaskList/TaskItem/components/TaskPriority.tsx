import Dot from '@/components/Dot/Dot';
import SelectProirty from '@/components/SelectPriorty/SelectPriorty';
import { Priority } from '@/lib/validation/task';
import { cn } from '@/utils/cn';

const PRIORITY_COLORS: Record<Priority, string> = {
  낮음: 'text-green-500',
  보통: 'text-yellow-500',
  중요: 'text-red-500',
};

interface TaskPriorityProps {
  priority: Priority;
  isEditing: boolean;
  onStartEdit: () => void;
  onSave: (priority: Priority) => void;
}

const TaskPriority = ({ priority, isEditing, onStartEdit, onSave }: TaskPriorityProps) => {
  if (isEditing) {
    return (
      <div className='w-32'>
        <SelectProirty
          value={priority}
          onChange={(newPriority) => {
            onSave(newPriority);
          }}
          className='w-full'
        />
      </div>
    );
  }

  return (
    <button
      onClick={onStartEdit}
      className='flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs transition-colors hover:border-purple-300 hover:bg-purple-50'
    >
      <Dot priority={priority} className='h-2 w-2' />
      <span className={cn('text-xs', PRIORITY_COLORS[priority])}>{priority}</span>
    </button>
  );
};

export default TaskPriority;
