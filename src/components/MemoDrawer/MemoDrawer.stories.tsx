import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { mockComplexMarkdownTask, mockEmptyMemoTask, mockSimpleMemoTask, mockTaskWithMemo } from '@/stories/mock/mockTask';
import { Task } from '@/types';

import MemoDrawer from './MemoDrawer';

const meta: Meta<typeof MemoDrawer> = {
  title: 'Components/MemoDrawer',
  component: MemoDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof MemoDrawer>;

const InteractiveWrapper = ({ task }: { task: Task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);

  const handleSaveMemo = (taskId: string, memo: string) => {
    setCurrentTask((prev) => ({ ...prev, memo }));
    alert(`메모 저장됨:\n${memo.substring(0, 100)}${memo.length > 100 ? '...' : ''}`);
  };

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-purple-50'>
      <button
        onClick={() => setIsOpen(true)}
        className='rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-purple-600'
      >
        메모 열기
      </button>
      <MemoDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} task={currentTask} onSaveMemo={handleSaveMemo} />
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractiveWrapper task={mockTaskWithMemo} />,
};

export const EmptyMemo: Story = {
  render: () => <InteractiveWrapper task={mockEmptyMemoTask} />,
};

export const SimpleMemo: Story = {
  render: () => <InteractiveWrapper task={mockSimpleMemoTask} />,
};

export const ComplexMarkdown: Story = {
  render: () => <InteractiveWrapper task={mockComplexMarkdownTask} />,
};
