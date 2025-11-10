import { GoalPayload } from '@/lib/validation/goal';
import { TaskPayload, Priority, RepeatDay } from '@/lib/validation/task';

import { GetTaskParams } from './params';

type Goal = GoalPayload & {
  id: string;
};

type Task = TaskPayload & {
  id: string;
  goal?: Goal;
};

export type { Task, Goal, Priority, RepeatDay, GetTaskParams };
