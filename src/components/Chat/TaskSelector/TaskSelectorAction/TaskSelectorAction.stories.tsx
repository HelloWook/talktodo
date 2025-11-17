import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TaskSelectorAction from './TaskSelectorAction';

const meta: Meta<typeof TaskSelectorAction> = {
  component: TaskSelectorAction,
  title: 'components/Chat/TaskSelector/TaskSelectorAction',
  tags: ['autodocs'],
  argTypes: {
    onNewGoalClick: { action: 'newGoalClicked' },
    onNextClick: { action: 'nextClicked' },
  },
};
export default meta;

type Story = StoryObj<typeof TaskSelectorAction>;

export const Default: Story = {
  args: {
    onNewGoalClick: () => {},
    onNextClick: () => {},
  },
};

