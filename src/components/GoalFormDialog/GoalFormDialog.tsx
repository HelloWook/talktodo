import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Form from '@/components/Form/Form';
import { GoalPayload, goalSchema } from '@/lib/validation/goal';

const GoalFormDialog = () => {
  const form = useForm<GoalPayload>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: '',
    },
  });
  return (
    <div>
      <Form form={form}>
        <Form.Header title='목표 생성' onClose={() => {}} />
        <Form.InputField name='name' label='목표' placeholder='목표를 입력하세요' />
      </Form>
    </div>
  );
};

export default GoalFormDialog;
