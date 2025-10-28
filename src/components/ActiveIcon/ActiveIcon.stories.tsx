import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ActiveIcon from './ActiveIcon';

const meta: Meta<typeof ActiveIcon> = {
  component: ActiveIcon,
  title: 'Components/ActiveIcon',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    active: {
      control: 'boolean',
      description: '활성 상태 여부',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스명',
    },
  },
};
export default meta;

type Story = StoryObj<typeof ActiveIcon>;

export const Active: Story = {
  args: {
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    active: false,
  },
};

export const BothStates: Story = {
  render: () => (
    <div className='flex items-center gap-6'>
      <div className='flex flex-col items-center gap-2'>
        <ActiveIcon active={true} className='h-8 w-8' />
        <span className='text-xs text-gray-600'>활성</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <ActiveIcon active={false} className='h-8 w-8' />
        <span className='text-xs text-gray-600'>비활성</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '활성/비활성 상태의 ActiveIcon 컴포넌트를 비교할 수 있습니다.',
      },
    },
  },
};

export const CustomSize: Story = {
  render: () => (
    <div className='flex items-center gap-6'>
      <div className='flex flex-col items-center gap-2'>
        <ActiveIcon active={true} className='h-4 w-4' />
        <span className='text-xs text-gray-600'>Small</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <ActiveIcon active={true} className='h-6 w-6' />
        <span className='text-xs text-gray-600'>Medium</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <ActiveIcon active={true} className='h-8 w-8' />
        <span className='text-xs text-gray-600'>Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 ActiveIcon 컴포넌트를 확인할 수 있습니다.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    active: true,
    className: 'h-6 w-6',
  },
  parameters: {
    docs: {
      description: {
        story: '활성 상태를 토글하여 아이콘 변화를 확인할 수 있습니다.',
      },
    },
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className='flex items-center gap-6'>
      <div className='flex flex-col items-center gap-2'>
        <ActiveIcon active={true} className='h-6 w-6 text-blue-500' />
        <span className='text-xs text-gray-600'>Blue</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <ActiveIcon active={true} className='h-6 w-6 text-green-500' />
        <span className='text-xs text-gray-600'>Green</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <ActiveIcon active={true} className='h-6 w-6 text-red-500' />
        <span className='text-xs text-gray-600'>Red</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '커스텀 색상이 적용된 ActiveIcon 컴포넌트를 확인할 수 있습니다.',
      },
    },
  },
};
