import { createQueryKeys } from '@lukemorales/query-key-factory';

export const tasks = createQueryKeys('tasks', {
  list: (filters: { userId: string; startDate: string }) => ({
    queryKey: [filters],
  }),
  detail: (id: string) => ({
    queryKey: [id],
  }),
});

export const queryKeys = {
  tasks,
} as const;
