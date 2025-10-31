'use client';

import Form from '@/components/Form/Form';
import { Task } from '@/types/Task';

interface TaskFormDialogProps {
  task: Task;
  goals: Array<{ id: string; name: string }>;
  onTaskChange: (task: Task) => void;
  onClose: () => void;
}

export default function TaskFormDialog({ task, goals, onTaskChange, onClose }: TaskFormDialogProps) {
  return (
    <div className='m-6 flex w-full justify-center'>
      <Form task={task} onTaskChange={onTaskChange}>
        <Form.Header title='할 일 편집' onClose={onClose} />
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
}
