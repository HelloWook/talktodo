import { TaskPayload } from '@/lib/validation/task';

type GetTaskParams = {
  userId: string;
  startDate: string;
};

type UpdateTaskParams = {
  id: string;
  data: TaskPayload;
};

type DeleteTaskParams = {
  id: string;
};

export type { GetTaskParams, UpdateTaskParams, DeleteTaskParams };
