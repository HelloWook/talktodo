import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ChatMessage from './ChatMessage';

const meta: Meta<typeof ChatMessage> = {
  component: ChatMessage,
  title: 'Components/Chat/ChatMessage',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'gradient',
      values: [{ name: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }],
    },
  },
  argTypes: {
    role: {
      control: { type: 'select' },
      options: ['user', 'assistant'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof ChatMessage>;

export const User: Story = {
  args: {
    message: '안녕하세요! 오늘 할 일을 추가하고 싶어요.',
    role: 'user',
  },
};

export const Assistant: Story = {
  args: {
    message: '안녕하세요! 무엇을 도와드릴까요? 어떤 할 일을 추가하고 싶으신가요?',
    role: 'assistant',
  },
};

export const LongMessage: Story = {
  args: {
    message:
      '이것은 매우 긴 메시지입니다. 채팅 메시지가 길어질 때 어떻게 표시되는지 확인하기 위한 테스트 메시지입니다. 여러 줄에 걸쳐 표시되어야 합니다.',
    role: 'user',
  },
};
