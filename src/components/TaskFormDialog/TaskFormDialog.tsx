'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Form from '@/components/Form/Form';
import { taskSchema, TaskPayload } from '@/lib/validation/task';
import { useCreateTask } from '@/quries/useTask';
import { useUserStore } from '@/stores/user';

interface TaskFormDialogProps {
  onTaskChange?: () => void;
  onClose: () => void;
}

export default function TaskFormDialog({ onTaskChange, onClose }: TaskFormDialogProps) {
  const { mutate } = useCreateTask();

  const user = useUserStore((state) => state.user);

  const form = useForm<TaskPayload>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      memo: '',
      priority: '보통',
      startDate: new Date(),
      repeatDays: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isDone: false,
      userId: user?.id,
      goalId: undefined,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const now = new Date();
    const payload: TaskPayload = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    mutate(payload, {
      onSuccess: () => {
        form.reset();
        onTaskChange?.();
        onClose();
      },
    });
  });

  return (
    <div className='m-6 flex w-full justify-center'>
      <Form form={form} onSubmit={handleSubmit}>
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
