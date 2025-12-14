'use client';

import { useState, useEffect } from 'react';

import GoalHeader from '@/components/GoalHeader/GoalHeader';
import GoalLayout from '@/components/GoalLayout/GoalLayout';
import TaskEditDialog from '@/components/TaskEditDialog/TaskEditDialog';
import { useDialog } from '@/hooks/useDialog';
import type { Goal, Task } from '@/types';

interface GoalContainerProps {
  goals: Goal[];
  tasks: Task[];
}

const GoalContainer = ({ goals, tasks }: GoalContainerProps) => {
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const { openDialog, closeDialog } = useDialog();

  useEffect(() => {
    if (goals.length === 0) {
      setCurrentGoalIndex(0);
    } else if (currentGoalIndex >= goals.length) {
      setCurrentGoalIndex(goals.length - 1);
    }
  }, [goals.length, currentGoalIndex]);

  const currentGoal = goals[currentGoalIndex] || null;

  const handleTaskClick = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const dialogId = openDialog(<TaskEditDialog task={task} onClose={() => closeDialog(dialogId)} />);
    }
  };

  const handleGoalChange = (index: number) => {
    setCurrentGoalIndex(index);
  };

  return (
    <main className='relative mx-auto flex h-full w-full max-w-[1080px] flex-col p-4'>
      <GoalHeader goal={currentGoal} tasks={tasks} />

      <GoalLayout
        goals={goals}
        tasks={tasks}
        currentGoalIndex={currentGoalIndex}
        onGoalChange={handleGoalChange}
        onTaskClick={handleTaskClick}
      />
    </main>
  );
};

export default GoalContainer;
