import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Dot from './Dot';

const meta: Meta<typeof Dot> = {
  component: Dot,
  title: 'Components/Dot',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    priority: {
      control: 'select',
      options: ['low', 'medium', 'high'],
      description: '우선순위에 따른 색상',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스명',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Dot>;

export const AllPriorities: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <Dot priority='낮음' className='h-4 w-4' />
        <span className='text-xs text-gray-600'>낮음</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Dot priority='보통' className='h-4 w-4' />
        <span className='text-xs text-gray-600'>보통</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Dot priority='중요' className='h-4 w-4' />
        <span className='text-xs text-gray-600'>중요</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 우선순위 레벨의 Dot 컴포넌트를 확인할 수 있습니다.',
      },
    },
  },
};

export const CustomSize: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <Dot priority='중요' className='h-2 w-2' />
        <span className='text-xs text-gray-600'>Small</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Dot priority='보통' className='h-4 w-4' />
        <span className='text-xs text-gray-600'>Medium</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Dot priority='중요' className='h-6 w-6' />
        <span className='text-xs text-gray-600'>Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 Dot 컴포넌트를 확인할 수 있습니다.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    priority: '보통',
    className: 'h-4 w-4',
  },
  parameters: {
    docs: {
      description: {
        story: '우선순위를 변경하여 색상 변화를 확인할 수 있습니다.',
      },
    },
  },
};
