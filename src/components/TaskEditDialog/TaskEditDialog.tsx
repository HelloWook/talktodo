import { zodResolver } from '@hookform/resolvers/zod';

import React from 'react';

import { useForm } from 'react-hook-form';

import Form from '@/components/Form/Form';
import { useAlert } from '@/hooks/useAlert';
import { taskSchema, TaskPayload } from '@/lib/validation/task';
import { useUpdateTask, useDeleteTask } from '@/quries/useTask';
import { useUserStore } from '@/stores/user';
import { Task } from '@/types';

interface TaskEditDialogProps {
  task: Task;
  onClose: () => void;
}

const TaskEditDialog = ({ onClose, task }: TaskEditDialogProps) => {
  const { mutate: updateMutate } = useUpdateTask();
  const { mutate: deleteMutate } = useDeleteTask();

  const { openAlert } = useAlert();
  const user = useUserStore((state) => state.user);

  const form = useForm<TaskPayload>({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      title: task.title,
      description: task.description || '',
      memo: task.memo || '',
      priority: task.priority,
      startDate: task.startDate instanceof Date ? task.startDate : new Date(task.startDate),
      repeatDays: task.repeatDays,
      isDone: task.isDone,
      userId: user?.id,
      goalId: task.goalId,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const payload: TaskPayload = {
      ...data,
    };

    openAlert({
      message: '할 일을 수정하시겠습니까?',
      handleClick: () => {
        updateMutate(
          { id: task.id, data: payload },
          {
            onSuccess: () => {
              form.reset();
              onClose();
              openAlert({
                message: '할 일이 수정되었습니다.',
              });
            },
          },
        );
      },
    });
  });

  const handleDelete = () => {
    openAlert({
      message: '할 일을 삭제하시겠습니까?',
      handleClick: () => {
        deleteMutate(
          { id: task.id },
          {
            onSuccess: () => {
              onClose();
            },
          },
        );
      },
    });
  };

  return (
    <div className='m-6 flex w-full justify-center'>
      <Form form={form} onSubmit={handleSubmit}>
        <Form.Header title='할 일 수정' onClose={onClose} />
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
        <Form.EditFormActions onEdit={handleSubmit} onDelete={handleDelete} />
      </Form>
    </div>
  );
};

export default TaskEditDialog;
