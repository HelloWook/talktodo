import { createQueryKeys } from '@lukemorales/query-key-factory';

export const tasks = createQueryKeys('tasks', {
  list: (filters: { userId: string; startDate: string }) => ({
    queryKey: [filters],
  }),
  detail: (id: string) => ({
    queryKey: [id],
  }),
});

export const goals = createQueryKeys('goals', {
  list: () => ({
    queryKey: ['list'],
  }),
  detail: (id: string) => ({
    queryKey: [id],
  }),
});

export const user = createQueryKeys('user', {
  detail: () => ({
    queryKey: ['detail'],
  }),
});

export const queryKeys = {
  tasks,
  goals,
  user,
} as const;
