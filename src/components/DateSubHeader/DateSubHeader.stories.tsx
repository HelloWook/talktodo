import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import DateSubHeader from './DateSubHeader';

const meta: Meta<typeof DateSubHeader> = {
  title: 'Components/DateSubHeader',
  component: DateSubHeader,
  parameters: {
    layout: 'fullscreen',
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
      <div className='flex w-full justify-center p-8'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DateSubHeader>;

export const Default: Story = {
  render: () => <DateSubHeader />,
};

export const ChristmasDate: Story = {
  render: () => <DateSubHeader />,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/2025-12-25',
      },
    },
    docs: {
      description: {
        story: '크리스마스 날짜로 설정된 DateSubHeader입니다.',
      },
    },
  },
};

export const NewYearDate: Story = {
  render: () => <DateSubHeader />,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/2026-01-01',
      },
    },
    docs: {
      description: {
        story: '새해 첫날로 설정된 DateSubHeader입니다.',
      },
    },
  },
};
