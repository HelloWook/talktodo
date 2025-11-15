import { z } from 'zod';

export const goalSchema = z.object({
  name: z.string().min(1),
});

export type GoalPayload = z.infer<typeof goalSchema>;
