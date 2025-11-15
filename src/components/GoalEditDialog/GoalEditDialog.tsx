'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Form from '@/components/Form/Form';
import { GoalPayload, goalSchema } from '@/lib/validation/goal';
import { useUpdateGoal } from '@/quries/useGoal';
import { useUserStore } from '@/stores/user';
import { Goal } from '@/types';

interface GoalEditDialogProps {
  goal: Goal;
  onClose: () => void;
}

const GoalEditDialog = ({ onClose, goal }: GoalEditDialogProps) => {
  const { mutate } = useUpdateGoal();
  const user = useUserStore((state) => state.user);

  const form = useForm<GoalPayload>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: goal.name,
      userId: user?.id ?? '',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    mutate(
      { id: goal.id, data },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      },
    );
  });

  return (
    <div>
      <Form form={form} onSubmit={handleSubmit} className='max-w-[300px]'>
        <Form.Header title='목표 수정' onClose={onClose} titleClassName='!text-xl text-center' />
        <Form.InputField name='name' placeholder='목표를 입력하세요 ' />
        <Form.FormActions className='mt-4' />
      </Form>
    </div>
  );
};

export default GoalEditDialog;
