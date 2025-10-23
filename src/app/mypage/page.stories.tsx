import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MyPage from './page';

const meta: Meta<typeof MyPage> = {
  title: 'Pages/MyPage',
  component: MyPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MyPage>;

export const Default: Story = {
  args: {},
};

export const WithBackground: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
