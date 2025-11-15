import type { Goal } from '@/types';

import { axiosInstance } from './axios';

import { GoalPayload } from '../validation/goal';

export const getGoals = async (): Promise<Goal[]> => {
  const response = await axiosInstance.get('/api/goal');
  return response.data.data;
};

export const createGoal = async (goal: GoalPayload) => {
  const response = await axiosInstance.post('/api/goal', {
    ...goal,
  });
  return response.data.data;
};

export const updateGoal = async (id: string, goal: GoalPayload) => {
  const response = await axiosInstance.patch('/api/goal', {
    id,
    ...goal,
  });
  return response.data.data;
};
