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

  async update(id: string, data: GoalPayload): Promise<Goal> {
    return await goalRepository.update(id, data);
  }

  async delete(id: string): Promise<Goal> {
    return await goalRepository.delete(id);
  }
}

export const goalService = new GoalService();
