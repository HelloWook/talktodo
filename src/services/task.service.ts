import { Task } from '@prisma/client';

import { TaskPayload } from '@/lib/validation/task';
import { taskRepository } from '@/repositories/task.repository';
import { GetTaskParams, UpdateTaskParams } from '@/types/params';

export class TaskService {
  async create(data: TaskPayload): Promise<Task> {
    return await taskRepository.create(data);
  }
  async findAll(params: GetTaskParams): Promise<Task[]> {
    return await taskRepository.findAll(params);
  }

  async update(params: UpdateTaskParams): Promise<Task> {
    return await taskRepository.update(params);
  }

  async delete(id: string): Promise<Task> {
    return await taskRepository.delete(id);
  }
}

export const taskService = new TaskService();
