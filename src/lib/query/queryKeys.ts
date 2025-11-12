import { createQueryKeys } from '@lukemorales/query-key-factory';

import { GetTaskParams } from '@/types';
export const tasks = createQueryKeys('tasks', {
  list: (filters: GetTaskParams) => ({
    queryKey: [filters],
  }),
  detail: (id: string) => ({
    queryKey: [id],
  }),
});

export const queryKeys = {
  tasks,
} as const;
