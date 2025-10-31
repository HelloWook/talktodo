import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import DateList from './DateList';

const meta: Meta<typeof DateList> = {
  title: 'Components/DateSubHeader/DateSelector/DateList',
  component: DateList,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/2025-01-15',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='p-8'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DateList>;

export const Default: Story = {
  render: () => <DateList />,
};

export const WithDifferentDate: Story = {
  render: () => <DateList />,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/2025-12-25',
      },
    },
  },
};
