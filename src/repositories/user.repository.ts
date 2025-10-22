import { PrismaClient, User } from '@prisma/client';

import { UserPayload } from './../lib/validation/user';

const prisma = new PrismaClient();

export class UserRepository {
  async Create(data: UserPayload): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }
}

export const userRepository = new UserRepository();
