import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { mockDefaultTask } from '@/stories/mock/mockTask';

import TaskEditDialog from './TaskEditDialog';

const meta: Meta<typeof TaskEditDialog> = {
  component: TaskEditDialog,
  title: 'components/TaskEditDialog',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TaskEditDialog>;

export const Default: Story = {
  args: {
    task: mockDefaultTask,
    onClose: () => {},
  },
};
