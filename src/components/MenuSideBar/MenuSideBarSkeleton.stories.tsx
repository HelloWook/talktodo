import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MenuSideBarSkeleton from './MenuSideBarSkeleton';

const meta: Meta<typeof MenuSideBarSkeleton> = {
  component: MenuSideBarSkeleton,
  title: 'components/Skeleton/MenuSideBarSkeleton',
  tags: ['autodocs'],
  parameters: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof MenuSideBarSkeleton>;

export const Default: Story = {
  render: () => <MenuSideBarSkeleton />,
};
