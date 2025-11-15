import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Form from '@/components/Form/Form';
import { GoalPayload, goalSchema } from '@/lib/validation/goal';

interface GoalFormDialogProps {
  onClose: () => void;
}

const GoalFormDialog = ({ onClose }: GoalFormDialogProps) => {
  const form = useForm<GoalPayload>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log('목표 생성:', data);
    onClose();
  });

  return (
    <div>
      <Form form={form} onSubmit={handleSubmit} className='max-w-[300px]'>
        <Form.Header title='목표 생성' onClose={onClose} titleClassName='!text-xl text-center' />
        <Form.InputField name='name' placeholder='목표를 입력하세요 ' className='mb-4 h-[50px]' />
        <Form.FormActions />
      </Form>
    </div>
  );
};

export default GoalFormDialog;
