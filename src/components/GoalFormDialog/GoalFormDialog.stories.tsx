import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import GoalFormDialog from './GoalFormDialog';

const meta: Meta<typeof GoalFormDialog> = {
  component: GoalFormDialog,
  title: 'components/GoalFormDialog',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof GoalFormDialog>;

export const Default: Story = {
  args: {},
};
