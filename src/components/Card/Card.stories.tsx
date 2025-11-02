import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Priority, RepeatDay } from '@/types/Task';

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
    const mockTask = {
      id: '1',
      title: '매일 아침 산책하기',
      description: '매일 아침 산책하기',
      memo: '',
      priority: '보통' as Priority,
      repeatDays: ['월', '화', '수', '목', '금', '토', '일'] as RepeatDay[],
      createdAt: new Date(),
      updatedAt: new Date(),
      isDone: false,
      goal: { id: 'g1', name: '건강' },
    };

    return (
      <Card.Provider task={mockTask} layout='card' onToggleDone={() => {}} onOpenMemo={() => {}}>
        <Card className='min-w-[184px]'>
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
    const mockTask = {
      id: '2',
      title: '중요한 할 일',
      description: '빨간색으로 표시되는 중요한 할 일',
      memo: '',
      priority: '중요' as Priority,
      repeatDays: ['월', '수', '금'] as RepeatDay[],
      createdAt: new Date(),
      updatedAt: new Date(),
      isDone: false,
      goal: { id: 'g1', name: '건강' },
    };

    return (
      <Card.Provider task={mockTask} layout='card' onToggleDone={() => {}} onOpenMemo={() => {}}>
        <Card className='min-w-[184px]'>
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
    const mockTask = {
      id: '3',
      title: '낮은 우선순위 할 일',
      description: '초록색으로 표시되는 낮은 우선순위 할 일',
      memo: '',
      priority: '낮음' as Priority,
      repeatDays: ['토', '일'] as RepeatDay[],
      createdAt: new Date(),
      updatedAt: new Date(),
      isDone: false,
      goal: { id: 'g1', name: '건강' },
    };

    return (
      <Card.Provider task={mockTask} layout='card' onToggleDone={() => {}} onOpenMemo={() => {}}>
        <Card className='min-w-[184px]'>
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
    const mockTask = {
      id: '4',
      title: '완료된 할 일',
      description: '이미 완료된 할 일입니다',
      memo: '완료 메모가 있습니다',
      priority: '보통' as Priority,
      repeatDays: ['월', '화', '수', '목', '금'] as RepeatDay[],
      createdAt: new Date(),
      updatedAt: new Date(),
      isDone: true,
      goal: { id: 'g1', name: '건강' },
    };

    return (
      <Card.Provider task={mockTask} layout='card' onToggleDone={() => {}} onOpenMemo={() => {}}>
        <Card className='min-w-[184px]'>
          <Card.Title />
          <Card.Description />
          <Card.Data className='border-b border-gray-300 pb-3' />
          <Card.Item className='mt-1 flex justify-between' />
        </Card>
      </Card.Provider>
    );
  },
};
