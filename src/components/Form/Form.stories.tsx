import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { taskSchema } from '@/lib/validation/task';
import { mockEmptyTask } from '@/stories/mock/mockTask';

import Form from './Form';

const meta = {
  title: 'components/Form',
  component: Form,
};

export default meta;

export const Light = () => {
  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: mockEmptyTask.title,
      description: mockEmptyTask.description,
      memo: mockEmptyTask.memo,
      priority: mockEmptyTask.priority,
      startDate: mockEmptyTask.startDate,
      repeatDays: mockEmptyTask.repeatDays,
      isDone: mockEmptyTask.isDone,
      userId: mockEmptyTask.userId,
      goalId: mockEmptyTask.goal?.id,
    },
  });

  const goals = [
    { id: 'g1', name: '건강' },
    { id: 'g2', name: '공부' },
    { id: 'g3', name: '취미' },
  ];

  return (
    <div className='m-6 flex w-full justify-center'>
      <Form form={form}>
        <Form.Header title='할 일 편집' onClose={() => {}} />
        <div className='mb-4'>
          <Form.InputField name='title' label='할 일' placeholder='할 일을 입력하세요' />
        </div>

        <div className='mb-4'>
          <Form.InputField name='description' label='설명' placeholder='설명을 입력하세요' />
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
