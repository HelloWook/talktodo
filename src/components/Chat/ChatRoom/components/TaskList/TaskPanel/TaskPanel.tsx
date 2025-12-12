'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

import Button from '@/components/Button/Button';

import { TaskSchedule } from '../../../types';
import TaskItem from '../TaskItem/TaskItem';

interface TaskPanelProps {
  tasks: TaskSchedule[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateTaskContent: (taskId: string, newContent: string) => void;
  onUpdateTaskDate: (taskId: string, newDate: string) => void;
  onUpdateTaskPriority: (taskId: string, priority: '낮음' | '보통' | '중요') => void;
  onRemoveTask: (taskId: string) => void;
  onCreateTasks: () => void;
}

const TaskPanel = ({
  tasks,
  isOpen,
  onClose,
  onUpdateTaskContent,
  onUpdateTaskDate,
  onUpdateTaskPriority,
  onRemoveTask,
  onCreateTasks,
}: TaskPanelProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className='fixed inset-0 z-40 bg-black/20 backdrop-blur-sm'
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='fixed top-0 right-0 z-50 h-full w-full max-w-[420px] bg-white shadow-2xl'
          >
            <div className='flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100'>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
                      stroke='#8f3fff'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div className='flex flex-col'>
                  <h2 className='text-base font-semibold text-gray-900'>생성된 할 일</h2>
                  <p className='text-xs text-gray-500'>채팅에서 생성된 작업 목록</p>
                </div>
                <div className='flex h-6 min-w-[24px] items-center justify-center rounded-full bg-purple-500 px-2.5'>
                  <span className='text-xs font-bold text-white'>{tasks.length}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className='flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-gray-100'
                aria-label='패널 닫기'
              >
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M15 5L5 15M5 5L15 15' stroke='#6b7280' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </button>
            </div>

            <div className='flex h-[calc(100vh-73px)] flex-col'>
              <div className='scrollbar-hide flex-1 overflow-y-auto p-6'>
                <div className='space-y-3'>
                  <AnimatePresence>
                    {tasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onUpdateContent={onUpdateTaskContent}
                        onUpdateDate={onUpdateTaskDate}
                        onUpdatePriority={onUpdateTaskPriority}
                        onRemove={onRemoveTask}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className='border-t border-gray-200 bg-white p-4'>
                <Button variant='primary' onClick={onCreateTasks} className='w-full'>
                  완료 ({tasks.length}개 할 일 생성)
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskPanel;
