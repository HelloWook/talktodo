import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ChatRoom from './ChatRoom';

const meta: Meta<typeof ChatRoom> = {
  component: ChatRoom,
  title: 'Components/Chat/ChatRoom',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'gradient',
      values: [{ name: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }],
    },
  },
  argTypes: {
    goal: {
      control: { type: 'text' },
    },
    onPrevClick: { action: 'prev clicked' },
    onNextClick: { action: 'next clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof ChatRoom>;

export const Default: Story = {
  args: {
    goal: '새로운 목표 만들기',
    onPrevClick: () => {},
    onNextClick: () => {},
  },
};

export const WithLongGoalName: Story = {
  args: {
    goal: '매우 긴 목표 이름을 가진 목표입니다. 이것은 테스트를 위한 긴 텍스트입니다.',
    onPrevClick: () => {},
    onNextClick: () => {},
  },
};
