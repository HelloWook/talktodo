import { Goal } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { GoalPayload } from '@/lib/validation/goal';

export class GoalRepository {
  async create(data: GoalPayload): Promise<Goal> {
    return await prisma.goal.create({
      data: {
        name: data.name,
        userId: data.userId,
      },
    });
  }

  async findAll(userId: string): Promise<Goal[]> {
    return await prisma.goal.findMany({
      where: {
        userId,
      },
    });
  }
}

export const goalRepository = new GoalRepository();
