'use client';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react';

import Fab from '@/components/Fab/Fab';
import MenuSideBar from '@/components/MenuSideBar';
import MenuSideBarSkeleton from '@/components/MenuSideBar/MenuSideBarSkeleton';
import TaskContainer from '@/components/TaskContainer/TaskContainer';
import TaskFormDialog from '@/components/TaskFormDialog/TaskFormDialog';
import TaskHeaderSkeleton from '@/components/TaskHeader/TaskHeaderSkeleton';
import TaskLayoutSkeleton from '@/components/TaskLayout/TaskLayoutSkeleton';
import Typography from '@/components/Typography/Typography';
import { useDialog } from '@/hooks/useDialog';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useSelectedDate } from '@/hooks/useSelectedDate';
import { useGetGoals } from '@/quries/useGoal';
import { useGetTasks } from '@/quries/useTask';
import { useUserStore } from '@/stores/user';

export default function Home() {
  const { openDialog, closeDialog } = useDialog();
  const user = useUserStore((state) => state.user);
  const isMobile = useMediaQuery('(max-width: 1280px)');

  const router = useRouter();

  const { selectedDate, setSelectedDate } = useSelectedDate();

  const { isLoading: isGoalsLoading } = useGetGoals();
  const { data: tasks, isLoading: isTasksLoading } = useGetTasks({
    startDate: format(selectedDate, 'yy-MM-dd'),
    userId: user?.id ?? '',
  });

  const isLoading = isGoalsLoading || isTasksLoading;

  return (
    <div className={`flex h-screen w-screen overflow-hidden bg-purple-50 ${isMobile ? 'flex-col' : 'flex-row'}`}>
      {/* 모바일일 때는 상단에, 데스크톱일 때는 좌측에 배치 */}
      <div className={isMobile ? 'w-full' : ''}>{isLoading ? <MenuSideBarSkeleton /> : <MenuSideBar />}</div>
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
              key: 'create-task',
              label: <span className='w-full text-center'>할 일 생성하기</span>,
              onClick: () => {
                const id = openDialog(<TaskFormDialog onClose={() => closeDialog(id)} initialDate={selectedDate} />);
              },
            },
            {
              key: 'ai-task',
              label: (
                <React.Fragment>
                  <Typography
                    variant='body3-medium-tight'
                    className='rounded-[8px] bg-purple-50 p-2 px-2 py-1 text-purple-400 group-hover:bg-purple-400 group-hover:text-white'
                  >
                    AI
                  </Typography>
                  할 일 정리하기
                </React.Fragment>
              ),
              onClick: () => {
                router.push('/chat');
              },
            },
          ]}
          className='absolute right-10 bottom-10'
        />
      )}
    </div>
  );
}
