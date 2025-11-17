import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TaskSelectorHeader from './TaskSelectorHeader';

const meta: Meta<typeof TaskSelectorHeader> = {
  component: TaskSelectorHeader,
  title: 'components/Chat/TaskSelector/TaskSelectorHeader',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TaskSelectorHeader>;

export const Default: Story = {
  args: {},
};
