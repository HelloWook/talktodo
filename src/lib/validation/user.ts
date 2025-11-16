import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  nickname: z.string().min(1),
  image: z.string().optional().nullable(),
});

export const userUpdateSchema = z.object({
  nickname: z.string().min(1),
  image: z.string().optional().nullable(),
});

export type UserPayload = z.infer<typeof userSchema>;
export type UserUpdatePayload = z.infer<typeof userUpdateSchema>;
