import { Task } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { TaskPayload } from '@/lib/validation/task';
import { GetTaskParams, UpdateTaskParams } from '@/types/params';

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

  async createMany(data: TaskPayload[]): Promise<Task[]> {
    return await prisma.task.createManyAndReturn({
      data: data.map((task) => ({
        title: task.title,
        description: task.description,
        memo: task.memo,
        priority: task.priority,
        repeatDays: task.repeatDays,
        startDate: task.startDate,
        isDone: task.isDone,
        userId: task.userId,
        goalId: task.goalId,
      })),
    });
  }
}

export const taskRepository = new TaskRepository();
