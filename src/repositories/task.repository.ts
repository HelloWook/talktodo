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
    const dateStart = new Date(startDate);
    dateStart.setHours(0, 0, 0, 0);

    const dateEnd = new Date(startDate);
    dateEnd.setHours(23, 59, 59, 999);

    return await prisma.task.findMany({
      where: {
        userId,
        startDate: {
          gte: dateStart,
          lte: dateEnd,
        },
      },
    });
  }
}

export const taskRepository = new TaskRepository();
