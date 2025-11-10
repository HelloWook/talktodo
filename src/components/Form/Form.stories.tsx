import { useState } from 'react';

import type { Task } from '@/types';

import Form from './Form';

const meta = {
  title: 'components/Form',
  component: Form,
};

export default meta;

export const Light = () => {
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
    </div>
  );
};
