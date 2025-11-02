import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import DateList from './DateList';

const meta: Meta<typeof DateList> = {
  title: 'Components/DateSubHeader/DateSelector/DateList',
  component: DateList,
  parameters: {
    layout: 'centered',
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
  render: () => {
    const [selectedDate, setSelectedDate] = useState(new Date('2025-01-15'));
    return <DateList selectedDate={selectedDate} onDateChange={setSelectedDate} />;
  },
};

export const WithDifferentDate: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState(new Date('2025-12-25'));
    return <DateList selectedDate={selectedDate} onDateChange={setSelectedDate} />;
  },
};
