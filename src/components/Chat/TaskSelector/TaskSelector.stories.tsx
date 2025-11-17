import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TaskSelector from './TaskSelector';
import TaskSelectorSkeleton from './TaskSelectorSkeleton';

const meta: Meta<typeof TaskSelector> = {
  component: TaskSelector,
  title: 'components/Chat/TaskSelector',
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof TaskSelector>;

export const Default: Story = {
  render: () => <TaskSelector />,
};

export const Loading: Story = {
  render: () => <TaskSelectorSkeleton />,
};
