import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  nickname: z.string().min(1),
  image: z.string().optional(),
});

export type UserPayload = z.infer<typeof userSchema>;
