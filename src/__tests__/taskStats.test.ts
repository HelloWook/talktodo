import { Task } from '@/types';
import { computeCompletionPercent, countCompletedTasks, getTodoStats } from '@/utils/taskStats';

const makeTask = (id: string, isDone: boolean): Task => ({
  id,
  title: `task-${id}`,
  description: '',
  memo: '',
  priority: '보통',
  repeatDays: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  isDone,
});

describe('taskStats 유틸', () => {
  it('빈 목록이면 countCompletedTasks는 0을 반환한다', () => {
    expect(countCompletedTasks([])).toBe(0);
  });

  it('완료된 항목만 countCompletedTasks에서 집계한다', () => {
    const tasks = [makeTask('1', true), makeTask('2', false), makeTask('3', true)];
    expect(countCompletedTasks(tasks)).toBe(2);
  });

  it('빈 목록이면 computeCompletionPercent는 0을 반환한다', () => {
    expect(computeCompletionPercent([])).toBe(0);
  });

  it('computeCompletionPercent는 반올림하여 정수를 반환한다', () => {
    const tasks = [makeTask('1', true), makeTask('2', false), makeTask('3', false)]; // 1/3 => 33.33 -> 33
    expect(computeCompletionPercent(tasks)).toBe(33);
  });

  it('모두 완료되면 computeCompletionPercent는 100을 반환한다', () => {
    const tasks = [makeTask('1', true), makeTask('2', true)];
    expect(computeCompletionPercent(tasks)).toBe(100);
  });

  it('getTodoStats는 합계, 완료, 미완료, 퍼센트를 일관되게 반환한다', () => {
    const tasks = [makeTask('1', true), makeTask('2', false), makeTask('3', true)];
    const stats = getTodoStats(tasks);
    expect(stats.total).toBe(3);
    expect(stats.completed).toBe(2);
    expect(stats.incomplete).toBe(1);
    expect(stats.percent).toBe(67);
  });
});
