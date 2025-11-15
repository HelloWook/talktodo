import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  memo: z.string().optional(),
  priority: z.enum(['낮음', '보통', '중요']),
  startDate: z.string().regex(/^\d{2}-\d{2}-\d{2}$/, '날짜 형식은 yy-mm-dd여야 합니다'),
  repeatDays: z.array(z.enum(['월', '화', '수', '목', '금', '토', '일'])),
  isDone: z.boolean(),
  userId: z.string().min(1),
  goalId: z.string().min(1).nullable().optional(),
});

export type Priority = '낮음' | '보통' | '중요';

export type RepeatDay = '월' | '화' | '수' | '목' | '금' | '토' | '일';

export type TaskPayload = z.infer<typeof taskSchema>;
