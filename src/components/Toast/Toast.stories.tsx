import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Toast from './Toast';

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'components/Toast',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    content: '톡투두 만세',
  },
};
