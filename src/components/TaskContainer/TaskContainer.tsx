'use client';
import { useQueryClient } from '@tanstack/react-query';
import { format, addDays, subDays } from 'date-fns';

import { useEffect, useState } from 'react';

import TaskHeader from '@/components/TaskHeader/TaskHeader';

import TaskLayout from '@/components/TaskLayout/TaskLayout';

import { useMemoDrawer } from '@/hooks/useMemoDrawer';
import { useGetTasks, useUpdateTask, prefetchTasks } from '@/quries/useTask';
import { useUserStore } from '@/stores/user';
import type { Task } from '@/types';
const TaskContainer = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const queryClient = useQueryClient();
  const { openMemoDrawer } = useMemoDrawer();

  const user = useUserStore((state) => state.user);

  const { data: tasks } = useGetTasks({
    startDate: format(selectedDate, 'yyyy-MM-dd'),
    userId: user?.id ?? '',
  });

  const { mutate: updateTask } = useUpdateTask();

  useEffect(() => {
    if (!user?.id) return;

    const prevDate = subDays(selectedDate, 1);
    const nextDate = addDays(selectedDate, 1);

    prefetchTasks(queryClient, {
      userId: user.id,
      startDate: format(prevDate, 'yyyy-MM-dd'),
    });

    prefetchTasks(queryClient, {
      userId: user.id,
      startDate: format(nextDate, 'yyyy-MM-dd'),
    });
  }, [selectedDate, user?.id, queryClient]);

  const handleOpenMemo = (taskId: string) => {
    const task = tasks?.find((task: Task) => task.id === taskId);
    if (task) {
      openMemoDrawer(task, handleSaveMemo);
    }
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Pick<Task, 'isDone' | 'memo'>>) => {
    const task = tasks?.find((task: Task) => task.id === taskId);
    if (!task || !user) return;

    updateTask({
      id: taskId,
      data: {
        title: task.title,
        description: task.description,
        memo: updates.memo !== undefined ? updates.memo : task.memo,
        priority: task.priority,
        startDate: task.startDate instanceof Date ? task.startDate : new Date(task.startDate),
        repeatDays: task.repeatDays,
        isDone: updates.isDone !== undefined ? updates.isDone : task.isDone,
        userId: user.id,
        goalId: task.goalId,
      },
    });
  };

  const handleToggleDone = (taskId: string) => {
    const task = tasks?.find((task: Task) => task.id === taskId);
    if (task) {
      handleUpdateTask(taskId, { isDone: !task.isDone });
    }
  };

  const handleSaveMemo = (taskId: string, memo: string) => {
    handleUpdateTask(taskId, { memo });
  };

  if (tasks === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <main className='relative mx-auto flex h-full w-full max-w-[1080px] flex-col p-4'>
      <TaskHeader tasks={tasks} />

      <TaskLayout
        tasks={tasks}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onToggleDone={handleToggleDone}
        onOpenMemo={handleOpenMemo}
      />
    </main>
  );
};

export default TaskContainer;
