import type { Meta, StoryObj } from '@storybook/nextjs-vite';

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
  render: () => <DatePickerButton />,
};

export const WithOpenModal: Story = {
  render: () => (
    <div className='h-[400px] w-[400px]'>
      <DatePickerButton />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼을 클릭하면 DatePicker 모달이 열립니다.',
      },
    },
  },
};
