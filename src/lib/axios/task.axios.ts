import type { Task } from '@/types';
import { GetTaskParams, UpdateTaskParams } from '@/types/params';

import { axiosInstance } from './axios';

import { TaskPayload } from '../validation/task';

export const getTasks = async (params: GetTaskParams): Promise<Task[]> => {
  const response = await axiosInstance.get('/api/task', {
    params: params,
  });
  return response.data.data;
};

export const createTask = async (task: TaskPayload) => {
  const response = await axiosInstance.post('/api/task', {
    ...task,
  });
  return response.data.data;
};

export const updateTask = async (params: UpdateTaskParams) => {
  const response = await axiosInstance.patch('/api/task', {
    id: params.id,
    ...params.data,
  });
  return response.data.data;
};

export const deleteTask = async (id: string) => {
  const response = await axiosInstance.delete('/api/task', {
    params: { id },
  });
  return response.data;
};
