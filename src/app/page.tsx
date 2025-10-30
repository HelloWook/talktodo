'use client';
import { useState } from 'react';

import Fab from '@/components/Fab/Fab';
import Form from '@/components/Form/Form';
import SideBar from '@/components/SideBar/SideBar';
import useDialog from '@/hooks/useDialog';
import { Task } from '@/types/Task';

export default function Home() {
  const { openDialog } = useDialog();

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
    <div className='h-screen w-screen'>
      <SideBar
        userNickname='John Doe'
        userEmail='john.doe@example.com'
        goals={[
          '밥먹기',
          '책읽기',
          '운동하기',
          '코딩하기',
          '놀기',
          '잠자기',
          '먹기',
          '읽기',
          '운동하기',
          '코딩하기',
          '놀기',
          '잠자기',
          '먹기',
          '읽기',
          '운동하기',
          '코딩하기',
        ]}
      />

      <Fab
        items={[
          {
            label: '할 일 생성하기',
            onClick: () =>
              openDialog(
                <div className='m-6 flex w-full justify-center'>
                  <Form task={task} onTaskChange={(t) => setTask({ ...t, updatedAt: new Date() })}>
                    <Form.Header title='할 일 편집' onClose={() => {}} />
                    <div className='mb-4'>
                      <Form.TitleField label='할 일' placeholder='할 일을 입력하세요' />
                    </div>

                    <div className='mb-4'>
                      <Form.DescriptionField label='설명' placeholder='설명을 입력하세요' />
                    </div>
                    <div className='mb-4 flex gap-3'>
                      <Form.SelectPriortyField />
                      <Form.DateField />
                    </div>
                    <div className='mb-4'>
                      <Form.GoalSelector goals={goals} />
                    </div>
                    <div className='mb-6'>
                      <Form.RepeatButtonGroup />
                    </div>
                    <Form.FormActions />
                  </Form>
                </div>,
              ),
          },
        ]}
        size='small'
        className='absolute right-10 bottom-10'
      />
    </div>
  );
}
