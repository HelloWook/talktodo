import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import type { LayoutType } from '@/components/TaskViewContainer/TaskViewContainer.types';

import DateSubHeader from './DateSubHeader';

const meta: Meta<typeof DateSubHeader> = {
  title: 'Components/DateSubHeader',
  component: DateSubHeader,
  parameters: {
    layout: 'fullscreen',
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
  render: () => {
    const [selectedDate, setSelectedDate] = useState(new Date('2025-01-15'));
    const [layout, setLayout] = useState<LayoutType>('card');

    return <DateSubHeader selectedDate={selectedDate} onDateChange={setSelectedDate} layout={layout} onLayoutChange={setLayout} />;
  },
};

export const ChristmasDate: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState(new Date('2025-12-25'));
    const [layout, setLayout] = useState<LayoutType>('card');

    return <DateSubHeader selectedDate={selectedDate} onDateChange={setSelectedDate} layout={layout} onLayoutChange={setLayout} />;
  },
  parameters: {
    docs: {
      description: {
        story: '크리스마스 날짜로 설정된 DateSubHeader입니다.',
      },
    },
  },
};

export const NewYearDate: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState(new Date('2026-01-01'));
    const [layout, setLayout] = useState<LayoutType>('card');

    return <DateSubHeader selectedDate={selectedDate} onDateChange={setSelectedDate} layout={layout} onLayoutChange={setLayout} />;
  },
  parameters: {
    docs: {
      description: {
        story: '새해 첫날로 설정된 DateSubHeader입니다.',
      },
    },
  },
};

export const ListLayout: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState(new Date('2025-06-15'));
    const [layout, setLayout] = useState<LayoutType>('list');

    return <DateSubHeader selectedDate={selectedDate} onDateChange={setSelectedDate} layout={layout} onLayoutChange={setLayout} />;
  },
  parameters: {
    docs: {
      description: {
        story: '리스트 레이아웃으로 설정된 DateSubHeader입니다.',
      },
    },
  },
};
