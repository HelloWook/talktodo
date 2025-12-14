'use client';

import { format } from 'date-fns';
import React from 'react';

import GoalContainer from '@/components/GoalContainer/GoalContainer';
import GoalHeaderSkeleton from '@/components/GoalHeader/GoalHeaderSkeleton';
import GoalLayoutSkeleton from '@/components/GoalLayout/GoalLayoutSkeleton';
import MenuSideBar from '@/components/MenuSideBar';
import MenuSideBarSkeleton from '@/components/MenuSideBar/MenuSideBarSkeleton';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useSelectedDate } from '@/hooks/useSelectedDate';
import { useGetGoals } from '@/quries/useGoal';
import { useGetTasks } from '@/quries/useTask';
import { useUserStore } from '@/stores/user';

export default function GoalPage() {
  const user = useUserStore((state) => state.user);
  const isMobile = useMediaQuery('(max-width: 1280px)');
  const { selectedDate } = useSelectedDate();

  const { data: goals = [], isLoading: isGoalsLoading } = useGetGoals();

  const { data: tasks = [], isLoading: isTasksLoading } = useGetTasks({
    startDate: format(selectedDate, 'yy-MM-dd'),
    userId: user?.id ?? '',
  });

  const isLoading = isGoalsLoading || isTasksLoading;

  return (
    <div className={`flex h-screen w-screen overflow-x-hidden overflow-y-scroll bg-purple-50 ${isMobile ? 'flex-col' : 'flex-row'}`}>
      <div className={isMobile ? 'w-full' : ''}>{isLoading ? <MenuSideBarSkeleton /> : <MenuSideBar />}</div>

      {isLoading ? (
        <main className='relative mx-auto flex h-full w-full max-w-[1080px] flex-col p-4'>
          <GoalHeaderSkeleton />
          <GoalLayoutSkeleton />
        </main>
      ) : (
        <GoalContainer goals={goals} tasks={tasks} />
      )}
    </div>
  );
}
