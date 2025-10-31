import { Task } from '@/types/Task';

export interface FilteredTasks {
  doneTasks: Task[];
  undoneTasks: Task[];
}

/**
 * Task 배열을 완료/미완료 상태로 분류합니다.
 * @param tasks - 분류할 Task 배열
 * @returns doneTasks와 undoneTasks로 분류된 객체
 */
export function filterTasksByStatus(tasks: Task[]): FilteredTasks {
  const doneTasks = tasks.filter((task) => task.isDone);
  const undoneTasks = tasks.filter((task) => !task.isDone);

  return {
    doneTasks,
    undoneTasks,
  };
}
