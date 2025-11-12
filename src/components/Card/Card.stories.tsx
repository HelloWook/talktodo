import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { mockCompletedTask, mockDefaultTask, mockHighPriorityTask, mockLowPriorityTask } from '@/stories/mock/mockTask';

import Card from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Card',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => {
    return (
      <Card.Provider task={mockDefaultTask} layout='card' onToggleDone={() => {}} onOpenMemo={() => {}}>
        <Card className='min-w-[184px]' handleClick={() => {}}>
          <Card.Title />
          <Card.Description />
          <Card.Data className='border-b border-gray-300 pb-3' />
          <Card.Item className='mt-1 flex justify-between' />
        </Card>
      </Card.Provider>
    );
  },
};

export const HighPriority: Story = {
  render: () => {
    return (
      <Card.Provider task={mockHighPriorityTask} layout='card' onToggleDone={() => {}} onOpenMemo={() => {}}>
        <Card className='min-w-[184px]' handleClick={() => {}}>
          <Card.Title />
          <Card.Description />
          <Card.Data className='border-b border-gray-300 pb-3' />
          <Card.Item className='mt-1 flex justify-between' />
        </Card>
      </Card.Provider>
    );
  },
};

export const LowPriority: Story = {
  render: () => {
    return (
      <Card.Provider task={mockLowPriorityTask} layout='card' onToggleDone={() => {}} onOpenMemo={() => {}}>
        <Card className='min-w-[184px]' handleClick={() => {}}>
          <Card.Title />
          <Card.Description />
          <Card.Data className='border-b border-gray-300 pb-3' />
          <Card.Item className='mt-1 flex justify-between' />
        </Card>
      </Card.Provider>
    );
  },
};

export const CompletedTask: Story = {
  render: () => {
    return (
      <Card.Provider task={mockCompletedTask} layout='card' onToggleDone={() => {}} onOpenMemo={() => {}}>
        <Card className='min-w-[184px]' handleClick={() => {}}>
          <Card.Title />
          <Card.Description />
          <Card.Data className='border-b border-gray-300 pb-3' />
          <Card.Item className='mt-1 flex justify-between' />
        </Card>
      </Card.Provider>
    );
  },
};
