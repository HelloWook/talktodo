import { PrismaClient, User } from '@prisma/client';

import { UserPayload } from './../lib/validation/user';

const prisma = new PrismaClient();

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
}

export const userRepository = new UserRepository();
