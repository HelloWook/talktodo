import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TaskSelectorSkeleton from './TaskSelectorSkeleton';

const meta: Meta<typeof TaskSelectorSkeleton> = {
  component: TaskSelectorSkeleton,
  title: 'components/skeleton/TaskSelectorSkeleton',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TaskSelectorSkeleton>;

export const Default: Story = {
  render: () => <TaskSelectorSkeleton />,
};
