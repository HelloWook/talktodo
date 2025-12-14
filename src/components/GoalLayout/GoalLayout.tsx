'use client';

import GoalBoard from '@/components/GoalBoard/GoalBoard';
import GoalNavigator from '@/components/GoalNavigator/GoalNavigator';
import type { Goal, Task } from '@/types';

interface GoalLayoutProps {
  goals: Goal[];
  tasks: Task[];
  currentGoalIndex: number;
  onGoalChange: (index: number) => void;
  onTaskClick?: (taskId: string) => void;
}

const GoalLayout = ({ goals, tasks, currentGoalIndex, onGoalChange, onTaskClick }: GoalLayoutProps) => {
  const currentGoal = goals[currentGoalIndex] || null;

  return (
    <>
      <GoalNavigator className='py-4' goals={goals} currentGoalIndex={currentGoalIndex} onGoalChange={onGoalChange} />

      <GoalBoard className='flex-1 overflow-hidden' goal={currentGoal} tasks={tasks} onTaskClick={onTaskClick} />
    </>
  );
};

export default GoalLayout;
