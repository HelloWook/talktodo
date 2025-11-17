import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { useState } from 'react';

import { mockGoals } from '@/stories/mock/mockGoal';

import GoalSelectorButton from './GoalSelectorButton';

const meta: Meta<typeof GoalSelectorButton> = {
  component: GoalSelectorButton,
  title: 'Components/Chat/TaskSelector/GoalSelectorButton',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof GoalSelectorButton>;

export const Default: Story = {
  render: (args) => {
    const [active, setActive] = useState(false);
    return <GoalSelectorButton {...args} active={active} onClick={() => setActive(!active)} goal={mockGoals[0]} />;
  },
};
