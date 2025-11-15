import { Goal } from '@prisma/client';

import { GoalPayload } from '@/lib/validation/goal';
import { goalRepository } from '@/repositories/goal.repository';

export class GoalService {
  async create(data: GoalPayload): Promise<Goal> {
    return await goalRepository.create(data);
  }

  async findAll(userId: string): Promise<Goal[]> {
    return await goalRepository.findAll(userId);
  }
}

export const goalService = new GoalService();
