import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Priority, RepeatDay } from '@/types/Task';

import TaskViewContainer from './TaskViewContainer';
import type { EmptyTaskStateProps, Task } from './TaskViewContainer.types';

const MockEmptyTaskState = ({ mode }: EmptyTaskStateProps) => (
  <div className='flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50'>
    <p className='text-gray-500'>{mode === 'todo' ? '할 일이 없습니다' : '완료한 일이 없습니다'}</p>
  </div>
);

const handleToggleDone = (taskId: string) => {
  console.log('Toggle done:', taskId);
};

const handleOpenMemo = (taskId: string) => {
  console.log('Open memo:', taskId);
};

const meta: Meta<typeof TaskViewContainer> = {
  title: 'Components/TaskViewContainer',
  component: TaskViewContainer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['square', 'rectangle'],
    },
    type: {
      control: { type: 'select' },
      options: ['todo', 'done'],
    },
  },
  args: {
    onToggleDone: handleToggleDone,
    onOpenMemo: handleOpenMemo,
    EmptyTaskState: MockEmptyTaskState,
  },
};

export default meta;

type Story = StoryObj<typeof TaskViewContainer>;

const createMockTask = (id: string): Task => ({
  id,
  title: `할 일 ${id}`,
  description: `할 일 ${id}의 설명입니다`,
  memo: '',
  priority: '보통' as Priority,
  repeatDays: ['월', '화', '수', '목', '금'] as RepeatDay[],
  createdAt: new Date(),
  updatedAt: new Date(),
  isDone: false,
  goal: {
    id: 'goal-1',
    name: '목표',
  },
});

const mockTasks = [
  createMockTask('1'),
  createMockTask('2'),
  createMockTask('3'),
  createMockTask('4'),
  createMockTask('5'),
  createMockTask('6'),
];

export const TodoSquareLayout: Story = {
  args: {
    items: mockTasks,
    layout: 'square',
    type: 'todo',
  },
};

export const TodoRectangleLayout: Story = {
  args: {
    items: mockTasks,
    layout: 'rectangle',
    type: 'todo',
  },
};

export const DoneSquareLayout: Story = {
  args: {
    items: mockTasks.slice(0, 3).map((task) => ({ ...task, isDone: true })),
    layout: 'square',
    type: 'done',
  },
};

export const DoneRectangleLayout: Story = {
  args: {
    items: mockTasks.slice(0, 3).map((task) => ({ ...task, isDone: true })),
    layout: 'rectangle',
    type: 'done',
  },
};

export const EmptyTodoState: Story = {
  args: {
    items: [],
    layout: 'square',
    type: 'todo',
  },
};

export const EmptyDoneState: Story = {
  args: {
    items: [],
    layout: 'rectangle',
    type: 'done',
  },
};

export const ManyTasksSquare: Story = {
  args: {
    items: Array.from({ length: 12 }, (_, i) => createMockTask(`${i + 1}`)),
    layout: 'square',
    type: 'todo',
  },
};

export const ManyTasksRectangle: Story = {
  args: {
    items: Array.from({ length: 12 }, (_, i) => createMockTask(`${i + 1}`)),
    layout: 'rectangle',
    type: 'todo',
  },
};
