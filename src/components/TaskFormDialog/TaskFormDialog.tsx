'use client';

import { useState } from 'react';

import Form from '@/components/Form/Form';
import { Task } from '@/types/Task';

interface TaskFormDialogProps {
  onTaskChange: (task: Task) => void;
  onClose: () => void;
}

const createInitialTask = (): Task => ({
  id: '',
  title: '',
  description: '',
  memo: '',
  priority: '보통',
  repeatDays: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  isDone: false,
  goal: { id: '', name: '' },
});

export default function TaskFormDialog({ onTaskChange, onClose }: TaskFormDialogProps) {
  const [task, setTask] = useState<Task>(createInitialTask());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTaskChange(task);
    onClose();
  };

  return (
    <div className='m-6 flex w-full justify-center'>
      <Form task={task} onTaskChange={setTask} onSubmit={handleSubmit}>
        <Form.Header title='할 일 생성' onClose={onClose} />
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
          <Form.GoalSelector goals={[]} />
        </div>
        <div className='mb-6'>
          <Form.RepeatButtonGroup />
        </div>
        <Form.FormActions />
      </Form>
    </div>
  );
}
