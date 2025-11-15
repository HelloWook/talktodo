'use client';
import { format } from 'date-fns';
import { useState } from 'react';

import Fab from '@/components/Fab/Fab';
import MenuSideBar from '@/components/MenuSideBar';
import MenuSideBarSkeleton from '@/components/MenuSideBar/MenuSideBarSkeleton';
import TaskContainer from '@/components/TaskContainer/TaskContainer';
import TaskFormDialog from '@/components/TaskFormDialog/TaskFormDialog';
import TaskHeaderSkeleton from '@/components/TaskHeader/TaskHeaderSkeleton';
import TaskLayoutSkeleton from '@/components/TaskLayout/TaskLayoutSkeleton';
import { useDialog } from '@/hooks/useDialog';
import { useGetGoals } from '@/quries/useGoal';
import { useGetTasks } from '@/quries/useTask';
import { useUserStore } from '@/stores/user';

export default function Home() {
  const { openDialog, closeDialog } = useDialog();
  const user = useUserStore((state) => state.user);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { isLoading: isGoalsLoading } = useGetGoals();
  const { data: tasks, isLoading: isTasksLoading } = useGetTasks({
    startDate: format(selectedDate, 'yy-MM-dd'),
    userId: user?.id ?? '',
  });

  const isLoading = isGoalsLoading || isTasksLoading;

  return (
    <div className='flex h-screen w-screen overflow-hidden bg-purple-50'>
      {isLoading ? <MenuSideBarSkeleton /> : <MenuSideBar />}
      {isLoading ? (
        <main className='relative mx-auto flex h-full w-full max-w-[1080px] flex-col p-4'>
          <TaskHeaderSkeleton />
          <TaskLayoutSkeleton />
        </main>
      ) : (
        <TaskContainer tasks={tasks ?? []} selectedDate={selectedDate} onDateChange={setSelectedDate} />
      )}
      {!isLoading && (
        <Fab
          size='small'
          items={[
            {
              label: '할 일 생성하기',
              onClick: () => {
                const id = openDialog(<TaskFormDialog onClose={() => closeDialog(id)} />);
              },
            },
          ]}
          className='absolute right-10 bottom-10'
        />
      )}
    </div>
  );
}
