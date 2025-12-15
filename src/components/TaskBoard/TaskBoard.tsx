import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Image from 'next/image';
import { useState } from 'react';

import CardView from '@/components/Card/CardView';
import { TaskViewContainer } from '@/components/TaskViewContainer';
import type { LayoutType } from '@/components/TaskViewContainer/TaskViewContainer.types';
import type { Task } from '@/types';
import { cn } from '@/utils/cn';
import { filterTasksByStatus } from '@/utils/filterTasks';

import ListView from '../Card/ListView';

export interface TaskBoardProps {
  tasks: Task[];
  layout?: LayoutType;
  onToggleDone: (taskId: string) => void;
  onOpenMemo: (taskId: string) => void;
  className?: string;
}

const EmptyTaskState = ({ mode }: { mode: 'todo' | 'done' }) => {
  const imageSrc = mode === 'todo' ? '/img/Done.png' : '/img/UnDone.png';
  return <Image src={imageSrc} alt='empty task' width={400} height={400} className='mx-auto' />;
};

export default function TaskBoard({ tasks, layout = 'card', onToggleDone, onOpenMemo, className }: TaskBoardProps) {
  const { doneTasks, undoneTasks } = filterTasksByStatus(tasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const targetZone = over.id as string;
    const task = tasks.find((t) => t.id === taskId);

    if (!task) return;

    // 드래그한 카드를 다른 영역으로 옮겼을 때만 상태 변경
    if (targetZone === 'done' && !task.isDone) {
      onToggleDone(taskId);
    } else if (targetZone === 'todo' && task.isDone) {
      onToggleDone(taskId);
    }
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={handleDragCancel}>
      <div className={cn('flex  max-h-[calc(100vh-100px)] w-full flex-col gap-2  md:flex-row', className)}>
        <TaskViewContainer
          items={undoneTasks}
          layout={layout}
          type='todo'
          EmptyTaskState={EmptyTaskState}
          onToggleDone={onToggleDone}
          onOpenMemo={onOpenMemo}
          isDragEnabled={true}
        />
        <div className='line mt-16 hidden w-[3px] md:mt-0 md:block' />
        <TaskViewContainer
          items={doneTasks}
          layout={layout}
          type='done'
          EmptyTaskState={EmptyTaskState}
          onToggleDone={onToggleDone}
          onOpenMemo={onOpenMemo}
          isDragEnabled={true}
        />
      </div>
      <DragOverlay>
        {activeTask && (
          <div className='h-[170px]'>
            {layout === 'card' ? (
              <CardView task={activeTask} onToggleDone={onToggleDone} onOpenMemo={onOpenMemo} onOpenEditDialog={() => {}} />
            ) : (
              <ListView task={activeTask} onToggleDone={onToggleDone} onOpenMemo={onOpenMemo} onOpenEditDialog={() => {}} />
            )}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
