import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import DateButton from './DateButton';
import type { DateInfo } from './DateSelector.types';

const meta: Meta<typeof DateButton> = {
  title: 'Components/DateSubHeader/DateSelector/DateButton',
  component: DateButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSelected: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DateButton>;

const mockDateInfo: DateInfo = {
  date: new Date(2025, 0, 15),
  year: 2025,
  month: 1,
  day: 15,
  dayOfWeek: '수',
};

export const Default: Story = {
  args: {
    dateInfo: mockDateInfo,
    isSelected: false,
    onClick: () => console.log('Date clicked'),
  },
};

export const Selected: Story = {
  args: {
    dateInfo: mockDateInfo,
    isSelected: true,
    onClick: () => console.log('Date clicked'),
  },
};

export const Multiple: Story = {
  render: () => (
    <div className='inline-flex gap-3'>
      <DateButton dateInfo={{ ...mockDateInfo, day: 13, dayOfWeek: '월' }} isSelected={false} onClick={() => console.log('13 clicked')} />
      <DateButton dateInfo={{ ...mockDateInfo, day: 14, dayOfWeek: '화' }} isSelected={false} onClick={() => console.log('14 clicked')} />
      <DateButton dateInfo={mockDateInfo} isSelected={true} onClick={() => console.log('15 clicked')} />
      <DateButton dateInfo={{ ...mockDateInfo, day: 16, dayOfWeek: '목' }} isSelected={false} onClick={() => console.log('16 clicked')} />
      <DateButton dateInfo={{ ...mockDateInfo, day: 17, dayOfWeek: '금' }} isSelected={false} onClick={() => console.log('17 clicked')} />
    </div>
  ),
};
