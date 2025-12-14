'use client';

import { format } from 'date-fns';
import { useState, useEffect } from 'react';

import GoalHeader from '@/components/GoalHeader/GoalHeader';
import GoalLayout from '@/components/GoalLayout/GoalLayout';
import TaskEditDialog from '@/components/TaskEditDialog/TaskEditDialog';
import { useDialog } from '@/hooks/useDialog';
import { useUpdateTask } from '@/quries/useTask';
import { useUserStore } from '@/stores/user';
import type { Goal, Task } from '@/types';

interface GoalContainerProps {
  goals: Goal[];
  tasks: Task[];
}

const GoalContainer = ({ goals, tasks }: GoalContainerProps) => {
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const { openDialog, closeDialog } = useDialog();
  const user = useUserStore((state) => state.user);
  const { mutate: updateTask } = useUpdateTask();

  useEffect(() => {
    if (goals.length === 0) {
      setCurrentGoalIndex(0);
    } else if (currentGoalIndex >= goals.length) {
      setCurrentGoalIndex(goals.length - 1);
    }
  }, [goals.length, currentGoalIndex]);

  const currentGoal = goals[currentGoalIndex] || null;

  const handleUpdateTask = (taskId: string, updates: Partial<Pick<Task, 'isDone' | 'memo'>>) => {
    const task = tasks.find((task: Task) => task.id === taskId);
    if (!task || !user) return;

    updateTask({
      id: taskId,
      data: {
        title: task.title,
        description: task.description,
        memo: updates.memo !== undefined ? updates.memo : task.memo,
        priority: task.priority,
        startDate: typeof task.startDate === 'string' ? task.startDate : format(new Date(task.startDate), 'yy-MM-dd'),
        repeatDays: task.repeatDays,
        isDone: updates.isDone !== undefined ? updates.isDone : task.isDone,
        userId: user.id,
        goalId: task.goalId,
      },
    });
  };

  const handleToggleDone = (taskId: string) => {
    const task = tasks.find((task: Task) => task.id === taskId);
    if (task) {
      handleUpdateTask(taskId, { isDone: !task.isDone });
    }
  };

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
        onToggleDone={handleToggleDone}
      />
    </main>
  );
};

export default GoalContainer;
