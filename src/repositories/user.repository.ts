import { User } from '@prisma/client';

import { prisma } from '@/lib/prisma';

import { UserPayload } from './../lib/validation/user';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async Create(data: UserPayload): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }

  async update(id: string, data: Partial<UserPayload>): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

export const userRepository = new UserRepository();
