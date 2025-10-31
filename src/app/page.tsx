'use client';
import { useState } from 'react';

import Fab from '@/components/Fab/Fab';
import Header from '@/components/Header/Header';
import SideBar from '@/components/SideBar/SideBar';
import TaskFormDialog from '@/components/TaskFormDialog/TaskFormDialog';
import useDialog from '@/hooks/useDialog';
import { Task } from '@/types/Task';

export default function Home() {
  const { openDialog, closeDialog } = useDialog();

  const [task, setTask] = useState<Task>({
    id: 't1',
    title: '',
    description: '',
    memo: '',
    priority: '보통',
    repeatDays: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDone: false,
    goal: { id: 'g1', name: '건강' },
  });

  const goals = [
    { id: 'g1', name: '건강' },
    { id: 'g2', name: '공부' },
    { id: 'g3', name: '취미' },
  ];

  return (
    <div className='flex h-screen w-screen bg-purple-50'>
      <SideBar userNickname='John Doe' userEmail='john.doe@example.com' goals={[]} />

      <main className='relative mx-auto w-[1080px] p-8'>
        <Header.Provider tasks={[task]}>
          <Header>
            <Header.Content />
          </Header>
        </Header.Provider>

        <Fab
          items={[
            {
              label: '할 일 생성하기',
              onClick: () => {
                const id = openDialog(
                  <TaskFormDialog
                    task={task}
                    goals={goals}
                    onTaskChange={(t) => setTask({ ...t, updatedAt: new Date() })}
                    onClose={() => closeDialog(id)}
                  />,
                );
              },
            },
          ]}
          size='small'
          className='absolute right-10 bottom-10'
        />
      </main>
    </div>
  );
}
