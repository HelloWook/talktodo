import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TaskLayoutSkeleton from './TaskLayoutSkeleton';

const meta: Meta<typeof TaskLayoutSkeleton> = {
  component: TaskLayoutSkeleton,
  title: 'components/Skeleton/TaskLayoutSkeleton',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TaskLayoutSkeleton>;

export const Default: Story = {
  render: () => <TaskLayoutSkeleton />,
};
