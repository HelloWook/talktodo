'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';

import Form from '@/components/Form/Form';
import { taskSchema, TaskPayload } from '@/lib/validation/task';
import { useGetGoals } from '@/quries/useGoal';
import { useCreateTask } from '@/quries/useTask';
import { useUserStore } from '@/stores/user';

interface TaskFormDialogProps {
  onClose: () => void;
  initialDate?: Date;
}

export default function TaskFormDialog({ onClose, initialDate }: TaskFormDialogProps) {
  const { mutate } = useCreateTask();
  const { data: goals = [] } = useGetGoals();

  const user = useUserStore((state) => state.user);

  const form = useForm<TaskPayload>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      memo: '',
      priority: '보통',
      startDate: initialDate ? format(initialDate, 'yy-MM-dd') : format(new Date(), 'yy-MM-dd'),
      repeatDays: [],
      isDone: false,
      userId: user?.id,
      goalId: undefined,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const payload: TaskPayload = {
      ...data,
    };

    mutate(payload, {
      onSettled: () => {
        form.reset();
        onClose();
      },
    });
  });

  return (
    <div className='m-6 flex w-full justify-center'>
      <Form form={form} onSubmit={handleSubmit}>
        <Form.Header title='할 일 생성' onClose={onClose} />
        <div className='mb-4'>
          <Form.InputField name='title' label='할 일' placeholder='할 일을 입력하세요' />
        </div>

        <div className='mb-4'>
          <Form.InputField name='description' label='설명' placeholder='설명을 입력하세요' />
        </div>
        <div className='mb-4 flex gap-3'>
          <Form.SelectPriortyField />
          <Form.DateField initialDate={initialDate} />
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
