import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MenuSideBar from './MenuSideBar';

const meta = {
  title: 'Components/MenuSideBar',
  component: MenuSideBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MenuSideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithClassName: Story = {
  args: {
    className: 'shadow-2xl',
  },
};
