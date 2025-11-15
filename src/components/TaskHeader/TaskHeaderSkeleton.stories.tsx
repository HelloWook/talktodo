import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TaskHeaderSkeleton from './TaskHeaderSkeleton';

const meta: Meta<typeof TaskHeaderSkeleton> = {
  component: TaskHeaderSkeleton,
  title: 'components/Skeleton/TaskHeaderSkeleton',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TaskHeaderSkeleton>;

export const Default: Story = {
  render: () => <TaskHeaderSkeleton />,
};
