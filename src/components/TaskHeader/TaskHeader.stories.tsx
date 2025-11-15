import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { mockCodeReviewTask, mockDocumentTask, mockMeetingTask, mockProjectTask, mockTestTask } from '@/stories/mock/mockTask';
import { Task } from '@/types';

import TaskHeader from './TaskHeader';

const meta: Meta<typeof TaskHeader> = {
  component: TaskHeader,
  title: 'components/TaskHeader',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TaskHeader>;

const mockTasks: Task[] = [mockProjectTask, mockCodeReviewTask, mockMeetingTask, mockDocumentTask, mockTestTask];

export const Default: Story = {
  render: () => <TaskHeader tasks={mockTasks} />,
};
