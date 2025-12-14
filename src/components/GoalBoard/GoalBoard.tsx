'use client';

import Icon from '@/components/Icon/Icon';
import Typography from '@/components/Typography/Typography';
import useMediaQuery from '@/hooks/useMediaQuery';
import type { Goal, Task } from '@/types';
import { cn } from '@/utils/cn';
interface GoalBoardProps {
  className?: string;
  goal: Goal | null;
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
}

const GoalBoard = ({ className, goal, tasks, onTaskClick }: GoalBoardProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  const goalTasks = goal ? tasks.filter((task) => task.goalId === goal.id) : [];

  if (!goal) {
    return (
      <div className={cn('flex flex-col items-center justify-center rounded-2xl bg-white p-8', className)}>
        <Icon name='flag' className='mb-4 h-12 w-12 text-gray-300' />
        <Typography variant='title3-semibold' className='mb-2 text-gray-900'>
          목표를 선택해주세요
        </Typography>
        <Typography variant='body2-medium-loose' className='text-gray-500'>
          사이드바에서 목표를 선택하거나 새로운 목표를 추가해보세요
        </Typography>
      </div>
    );
  }

  if (goalTasks.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center rounded-2xl bg-white p-8', className)}>
        <Icon name='memo' className='mb-4 h-12 w-12 fill-white text-gray-300' />
        <Typography variant='title3-semibold' className='mb-2 text-gray-500'>
          아직 등록된 작업이 없습니다
        </Typography>
      </div>
    );
  }

  return (
    <div className={cn('overflow-auto rounded-2xl bg-white p-6', className)}>
      <div className='mb-4 flex items-center justify-between'>
        <Typography variant={isMobile ? 'title3-semibold' : 'title2-semibold'} className='text-gray-900'>
          작업 목록
        </Typography>
        <Typography variant='body2-medium-loose' className='text-gray-500'>
          총 {goalTasks.length}개
        </Typography>
      </div>

      <div className='space-y-3'>
        {goalTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onTaskClick?.(task.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onTaskClick?.(task.id);
              }
            }}
            role='button'
            tabIndex={0}
            className={cn(
              'cursor-pointer rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all hover:border-purple-300 hover:bg-purple-50',
              task.isDone && 'opacity-60',
            )}
          >
            <div className='flex items-start gap-3'>
              <div
                className={cn(
                  'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2',
                  task.isDone ? 'border-purple-500 bg-purple-500' : 'border-gray-300 bg-white',
                )}
              >
                {task.isDone && <Icon name='close' className='h-3 w-3 text-white' />}
              </div>

              <div className='min-w-0 flex-1'>
                <Typography
                  variant='body2-medium-loose'
                  className={cn('mb-1 overflow-hidden overflow-ellipsis', task.isDone ? 'text-gray-500 line-through' : 'text-gray-900')}
                >
                  {task.title}
                  <br />
                </Typography>
                {task.description && (
                  <Typography variant='body3-medium-loose' className='truncate overflow-hidden text-ellipsis text-gray-500'>
                    {task.description}
                  </Typography>
                )}
              </div>

              {task.priority && (
                <div
                  className={cn(
                    'flex-shrink-0 rounded px-2 py-1',
                    task.priority === '중요' && 'bg-red-100 text-red-600',
                    task.priority === '보통' && 'bg-yellow-100 text-yellow-600',
                    task.priority === '낮음' && 'bg-green-100 text-green-600',
                  )}
                >
                  <Typography variant='body3-medium-loose'>{task.priority}</Typography>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalBoard;
