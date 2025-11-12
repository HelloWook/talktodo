import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { mockCodeReviewTask, mockDocumentTask, mockMeetingTask, mockProjectTask, mockTestTask } from '@/stories/mock/mockTask';
import { Task } from '@/types';

import TaskLayout from './TaskLayout';
import TaskLayoutSkeleton from './TaskLayoutSkeleton';

const meta: Meta<typeof TaskLayout> = {
  component: TaskLayout,
  title: 'components/Skeleton/TaskLayout',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TaskLayout>;

const mockTasks: Task[] = [mockProjectTask, mockCodeReviewTask, mockMeetingTask, mockDocumentTask, mockTestTask];

export const Default: Story = {
  render: () => (
    <TaskLayout tasks={mockTasks} selectedDate={new Date()} onDateChange={() => {}} onToggleDone={() => {}} onOpenMemo={() => {}} />
  ),
};

export const Skeleton: Story = {
  render: () => <TaskLayoutSkeleton />,
};
