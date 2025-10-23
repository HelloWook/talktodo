import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MyPageForm from './MyPageForm';

const meta: Meta<typeof MyPageForm> = {
  title: 'Components/MyPageForm',
  component: MyPageForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithFormInteraction: Story = {
  args: {},
};
