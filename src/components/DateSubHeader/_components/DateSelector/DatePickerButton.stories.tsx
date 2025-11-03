import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import DatePickerButton from './DatePickerButton';

const meta: Meta<typeof DatePickerButton> = {
  title: 'Components/DateSubHeader/DateSelector/DatePickerButton',
  component: DatePickerButton,
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

type Story = StoryObj<typeof DatePickerButton>;

export const Default: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState(new Date('2025-01-15'));
    return <DatePickerButton selectedDate={selectedDate} onDateChange={setSelectedDate} />;
  },
};

export const WithOpenModal: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState(new Date('2025-01-15'));
    return (
      <div className='h-[400px] w-[400px]'>
        <DatePickerButton selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '버튼을 클릭하면 DatePicker 모달이 열립니다.',
      },
    },
  },
};
