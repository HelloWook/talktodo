'use client';

import { format } from 'date-fns';
import { useState, useCallback } from 'react';

import { useToast } from '@/hooks/useToast';
import { useCreateTasks } from '@/quries/useTask';
import { useUserStore } from '@/stores/user';

import { ChatHeader, ChatRoomContainer, TaskList } from './components/index';
import { ChatHeaderProps, ChatRoomAction, TaskSchedule } from './types';

type ChatRoomProps = ChatHeaderProps & ChatRoomAction & { goalId?: string };

const ChatRoom = ({ goal, onPrevClick, onNextClick, goalId }: ChatRoomProps) => {
  const [tasks, setTasks] = useState<TaskSchedule[]>([]);
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const { mutate: createTasks } = useCreateTasks();
  const { addToast } = useToast();

  console.log(tasks);

  const handleAddTask = useCallback(
    (schedule: TaskSchedule) => {
      const newTask: TaskSchedule = {
        ...schedule,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      setTasks((prev) => [...prev, newTask]);
      if (!isTaskPanelOpen) {
        setIsTaskPanelOpen(true);
      }
    },
    [isTaskPanelOpen],
  );

  const handleRemoveTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }, []);

  const handleUpdateTaskContent = useCallback((taskId: string, newContent: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, content: newContent } : task)));
  }, []);

  const handleUpdateTaskDate = useCallback((taskId: string, newDate: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, taskDate: newDate } : task)));
  }, []);

  const handleUpdateTaskPriority = useCallback((taskId: string, priority: '낮음' | '보통' | '중요') => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, priority } : task)));
  }, []);

  const handleCreateTasks = useCallback(() => {
    if (!user?.id) {
      addToast('로그인이 필요합니다.');
      return;
    }

    if (tasks.length === 0) {
      addToast('생성할 할 일이 없습니다.');
      return;
    }

    const taskPayloads = tasks.map((task) => {
      const taskDate = task.startDate;
      const [year, month, day] = taskDate.split('-');
      const fullYear = parseInt(year, 10) < 100 ? 2000 + parseInt(year, 10) : parseInt(year, 10);
      const date = new Date(fullYear, parseInt(month, 10) - 1, parseInt(day, 10));
      const formattedDate = format(date, 'yy-MM-dd');

      return {
        title: task.title,
        description: task.description ?? '',
        memo: task.memo ?? '',
        priority: (task.priority || '보통') as '낮음' | '보통' | '중요',
        startDate: formattedDate,
        repeatDays: [],
        isDone: false,
        userId: user.id,
        goalId: goalId || null,
      };
    });

    createTasks(taskPayloads);
    setTasks([]);
    setIsTaskPanelOpen(false);
  }, [tasks, user, goalId, createTasks, addToast]);

  return (
    <>
      <div className='m-auto flex h-screen w-[90%] max-w-[968px] flex-col gap-8'>
        <ChatHeader goal={goal} onPrevClick={onPrevClick} onNextClick={onNextClick} />
        <div className='flex flex-1 flex-col overflow-hidden'>
          <ChatRoomContainer handleSetTaskSchedules={handleAddTask} userId={user?.id} goalId={goalId} />
        </div>
      </div>

      <TaskList
        tasks={tasks}
        isOpen={isTaskPanelOpen}
        onClose={() => setIsTaskPanelOpen(false)}
        onToggle={() => setIsTaskPanelOpen(!isTaskPanelOpen)}
        onUpdateTaskContent={handleUpdateTaskContent}
        onUpdateTaskDate={handleUpdateTaskDate}
        onUpdateTaskPriority={handleUpdateTaskPriority}
        onRemoveTask={handleRemoveTask}
        onCreateTasks={handleCreateTasks}
      />
    </>
  );
};

export default ChatRoom;
