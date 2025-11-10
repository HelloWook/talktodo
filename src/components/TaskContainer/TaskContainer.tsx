'use client';
import { useQueryClient } from '@tanstack/react-query';
import { format, addDays, subDays } from 'date-fns';

import { useEffect, useState } from 'react';

import { DateSubHeader } from '@/components/DateSubHeader';

import TaskHeader from '@/components/Header/TaskHeader/TaskHeader';
import MemoDrawer from '@/components/MemoDrawer/MemoDrawer';

import { TaskBoard } from '@/components/TaskBoard';
import type { LayoutType } from '@/components/TaskViewContainer/TaskViewContainer.types';

import { useGetTasks, useUpdateTask, prefetchTasks } from '@/quries/useTask';
import { useUserStore } from '@/stores/user';
import type { Task } from '@/types';
const TaskContainer = () => {
  const [layout, setLayout] = useState<LayoutType>('card');
  const [selectedTaskForMemo, setSelectedTaskForMemo] = useState<Task | null>(null);
  const [isMemoDrawerOpen, setIsMemoDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const queryClient = useQueryClient();

  const handleCloseMemo = () => {
    setIsMemoDrawerOpen(false);
    setSelectedTaskForMemo(null);
  };

  const user = useUserStore((state) => state.user);

  const { data: tasks } = useGetTasks({
    startDate: format(selectedDate, 'yyyy-MM-dd'),
    userId: user?.id ?? '',
  });

  const { mutate: updateTask } = useUpdateTask();

  // 날짜 변경 시 이전/다음 날짜의 데이터를 prefetch
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

  const handleLayoutChange = (newLayout: LayoutType) => {
    setLayout(newLayout);
  };

  const handleOpenMemo = (taskId: string) => {
    const task = tasks?.find((task: Task) => task.id === taskId);
    if (task) {
      setSelectedTaskForMemo(task);
      setIsMemoDrawerOpen(true);
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

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  if (tasks === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <main className='relative mx-auto flex h-full w-full max-w-[1080px] flex-col p-4'>
      <TaskHeader tasks={tasks} />

      <DateSubHeader
        className='py-4'
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        layout={layout}
        onLayoutChange={handleLayoutChange}
      />

      <TaskBoard
        className='flex-1 overflow-hidden'
        tasks={tasks}
        layout={layout}
        onToggleDone={handleToggleDone}
        onOpenMemo={handleOpenMemo}
      />
      <MemoDrawer isOpen={isMemoDrawerOpen} onClose={handleCloseMemo} task={selectedTaskForMemo} onSaveMemo={handleSaveMemo} />
    </main>
  );
};

export default TaskContainer;
