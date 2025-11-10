import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { mockCodeReviewTask, mockDocumentTask, mockMeetingTask, mockProjectTask, mockTestTask } from '@/stories/mock/mockTask';
import { Task } from '@/types';

import Header from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'components/Header',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Header>;

const mockTasks: Task[] = [mockProjectTask, mockCodeReviewTask, mockMeetingTask, mockDocumentTask, mockTestTask];

const completedTasks: Task[] = mockTasks.map((task) => ({ ...task, isDone: true }));

export const Default: Story = {
  render: () => (
    <Header.Provider tasks={mockTasks}>
      <Header>
        <Header.Content />
      </Header>
    </Header.Provider>
  ),
};

export const Completed: Story = {
  render: () => (
    <Header.Provider tasks={completedTasks}>
      <Header>
        <Header.Content />
      </Header>
    </Header.Provider>
  ),
};

export const Empty: Story = {
  render: () => (
    <Header.Provider tasks={[]}>
      <Header>
        <Header.Content />
      </Header>
    </Header.Provider>
  ),
};
