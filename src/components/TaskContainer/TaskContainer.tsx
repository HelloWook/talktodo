'use client';
import { useQueryClient } from '@tanstack/react-query';
import { format, addDays, subDays } from 'date-fns';
import { useEffect } from 'react';

import TaskHeader from '@/components/TaskHeader/TaskHeader';
import TaskLayout from '@/components/TaskLayout/TaskLayout';

import { useMemoDrawer } from '@/hooks/useMemoDrawer';
import { prefetchTasks, useUpdateTask } from '@/quries/useTask';
import { useUserStore } from '@/stores/user';
import type { Task } from '@/types';

interface TaskContainerProps {
  tasks: Task[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const TaskContainer = ({ tasks, selectedDate, onDateChange }: TaskContainerProps) => {
  const queryClient = useQueryClient();
  const { openMemoDrawer } = useMemoDrawer();
  const user = useUserStore((state) => state.user);
  const { mutate: updateTask } = useUpdateTask();

  useEffect(() => {
    if (!user?.id) return;

    const prevDate = subDays(selectedDate, 2);
    const nextDate = addDays(selectedDate, 2);

    prefetchTasks(queryClient, {
      userId: user.id,
      startDate: format(prevDate, 'yy-MM-dd'),
    });

    prefetchTasks(queryClient, {
      userId: user.id,
      startDate: format(nextDate, 'yy-MM-dd'),
    });
  }, [selectedDate, user?.id, queryClient]);

  const handleOpenMemo = (taskId: string) => {
    const task = tasks.find((task: Task) => task.id === taskId);
    if (task) {
      openMemoDrawer(task, handleSaveMemo);
    }
  };

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

  const handleSaveMemo = (taskId: string, memo: string) => {
    handleUpdateTask(taskId, { memo });
  };

  return (
    <main className='relative mx-auto flex h-full w-full max-w-[1080px] flex-col p-4'>
      <TaskHeader tasks={tasks} />
      <TaskLayout
        tasks={tasks}
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        onToggleDone={handleToggleDone}
        onOpenMemo={handleOpenMemo}
      />
    </main>
  );
};

export default TaskContainer;
