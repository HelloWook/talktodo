'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Form from '@/components/Form/Form';
import { useAlert } from '@/hooks/useAlert';
import { GoalPayload, goalSchema } from '@/lib/validation/goal';
import { useUpdateGoal, useDeleteGoal } from '@/quries/useGoal';
import { useUserStore } from '@/stores/user';
import { Goal } from '@/types';

interface GoalEditDialogProps {
  goal: Goal;
  onClose: () => void;
}

const GoalEditDialog = ({ onClose, goal }: GoalEditDialogProps) => {
  const { mutate: updateMutate } = useUpdateGoal();
  const { mutate: deleteMutate } = useDeleteGoal();
  const { openAlert } = useAlert();
  const user = useUserStore((state) => state.user);

  const form = useForm<GoalPayload>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: goal.name,
      userId: user?.id ?? '',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    openAlert({
      message: '목표를 수정하시겠습니까?',
      handleClick: () => {
        updateMutate(
          { id: goal.id, data },
          {
            onSuccess: () => {
              form.reset();
              onClose();
              openAlert({
                message: '목표가 수정되었습니다.',
              });
            },
          },
        );
      },
    });
  });

  const handleDelete = () => {
    openAlert({
      message: '목표를 삭제하시겠습니까?',
      handleClick: () => {
        deleteMutate(goal.id, {
          onSuccess: () => {
            onClose();
          },
        });
      },
    });
  };

  return (
    <div>
      <Form form={form} onSubmit={handleSubmit} className='max-w-[300px]'>
        <Form.Header title='목표 수정' onClose={onClose} titleClassName='!text-xl text-center' />
        <Form.InputField name='name' placeholder='목표를 입력하세요 ' />
        <Form.EditFormActions onEdit={handleSubmit} onDelete={handleDelete} className='mt-4' />
      </Form>
    </div>
  );
};

export default GoalEditDialog;
