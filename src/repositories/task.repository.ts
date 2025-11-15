import { PrismaClient, Task } from '@prisma/client';

import { TaskPayload } from '@/lib/validation/task';
import { GetTaskParams, UpdateTaskParams } from '@/types/params';

const prisma = new PrismaClient();

export class TaskRepository {
  async create(data: TaskPayload): Promise<Task> {
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        memo: data.memo,
        priority: data.priority,
        repeatDays: data.repeatDays,
        startDate: data.startDate,
        isDone: data.isDone,
        userId: data.userId,
        goalId: data.goalId,
      },
    });
  }

  async update({ id, data }: UpdateTaskParams): Promise<Task> {
    return await prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        memo: data.memo,
        priority: data.priority,
        repeatDays: data.repeatDays,
        startDate: data.startDate,
        updatedAt: new Date(),
        isDone: data.isDone,
        userId: data.userId,
        goalId: data.goalId,
      },
    });
  }
  async findAll({ userId, startDate }: GetTaskParams): Promise<Task[]> {
    return await prisma.task.findMany({
      where: {
        userId,
        startDate: startDate,
      },
    });
  }

  async delete(id: string): Promise<Task> {
    return await prisma.task.delete({
      where: { id },
    });
  }
}

export const taskRepository = new TaskRepository();
