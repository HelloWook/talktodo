'use client';

import { useState } from 'react';

import { DateSubHeader } from '@/components/DateSubHeader';
import { TaskBoard } from '@/components/TaskBoard';
import type { LayoutType } from '@/components/TaskViewContainer/TaskViewContainer.types';
import type { Task } from '@/types';

interface TaskLayoutProps {
  tasks: Task[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onToggleDone: (taskId: string) => void;
  onOpenMemo: (taskId: string) => void;
}

const TaskLayout = ({ tasks, selectedDate, onDateChange, onToggleDone, onOpenMemo }: TaskLayoutProps) => {
  const [layout, setLayout] = useState<LayoutType>('card');

  const handleLayoutChange = (newLayout: LayoutType) => {
    setLayout(newLayout);
  };

  return (
    <>
      <DateSubHeader
        className='py-4'
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        layout={layout}
        onLayoutChange={handleLayoutChange}
      />

      <TaskBoard className='flex-1' tasks={tasks} layout={layout} onToggleDone={onToggleDone} onOpenMemo={onOpenMemo} />
    </>
  );
};

export default TaskLayout;
