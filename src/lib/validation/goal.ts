import { z } from 'zod';

export const goalSchema = z.object({
  name: z.string().min(1, '목표는 필수 입력 항목입니다.'),
  userId: z.string().min(1, '사용자 ID는 필수 입력 항목입니다.'),
});

export type GoalPayload = z.infer<typeof goalSchema>;
