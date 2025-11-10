import { z } from 'zod';

const goalSchema = z.object({
  name: z.string().min(1),
});

export type GoalPayload = z.infer<typeof goalSchema>;
