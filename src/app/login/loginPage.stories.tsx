import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import loginPage from './page';

const meta: Meta<typeof loginPage> = {
  component: loginPage,
  title: 'loginPage',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof loginPage>;

export const Default: Story = {
  args: {},
};
