import { TaskPayload } from '@/lib/validation/task';

type GetTaskParams = {
  userId: string;
  startDate: string;
};

type UpdateTaskParams = {
  id: string;
  data: TaskPayload;
};

export type { GetTaskParams, UpdateTaskParams };
