import { Task } from '@/types';

export function countCompletedTasks(tasks: Task[]): number {
  return tasks.filter((task) => task.isDone).length;
}

export function computeCompletionPercent(tasks: Task[]): number {
  const total = tasks.length;
  if (total === 0) return 0;
  const completed = countCompletedTasks(tasks);
  return Math.round((completed / total) * 100);
}

export function getTodoStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = countCompletedTasks(tasks);
  const incomplete = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const isCompleted = percent === 100;
  return { total, completed, incomplete, percent, isCompleted } as const;
}
