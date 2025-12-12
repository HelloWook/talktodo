'use client';

import { motion } from 'framer-motion';

import { Priority } from '@/lib/validation/task';
import { cn } from '@/utils/cn';

import TaskCheckbox from './components/TaskCheckbox';
import TaskDatePicker from './components/TaskDatePicker';
import TaskDeleteButton from './components/TaskDeleteButton';
import TaskPriority from './components/TaskPriority';
import TaskTitle from './components/TaskTitle';
import { useTaskItem } from './hooks/useTaskItem';
import { TaskSchedule } from '../../../types';

interface TaskItemProps {
  task: TaskSchedule;
  onUpdateContent: (taskId: string, newContent: string) => void;
  onUpdateDate: (taskId: string, newDate: string) => void;
  onUpdatePriority: (taskId: string, priority: Priority) => void;
  onRemove: (taskId: string) => void;
}

const TaskItem = ({ task, onUpdateContent, onUpdateDate, onUpdatePriority, onRemove }: TaskItemProps) => {
  const priority: Priority = task.priority || '보통';
  const taskId = task.id!;

  const {
    isEditingTitle,
    setIsEditingTitle,
    showDatePicker,
    setShowDatePicker,
    showPrioritySelect,
    setShowPrioritySelect,
    handleDateChange,
    handleContentChange,
    handlePriorityChange,
  } = useTaskItem({
    taskId,
    onUpdateDate,
    onUpdateContent,
    onUpdatePriority,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4',
        'transition-all duration-200 hover:border-purple-300 hover:bg-purple-50 hover:shadow-md',
      )}
    >
      <TaskCheckbox />

      <div className='relative flex flex-1 flex-col gap-2'>
        <TaskTitle
          title={task.title}
          isEditing={isEditingTitle}
          onStartEdit={() => setIsEditingTitle(true)}
          onSave={handleContentChange}
          onCancel={() => setIsEditingTitle(false)}
        />

        <div className='flex flex-col gap-2'>
          <TaskDatePicker
            dateString={task.startDate}
            isOpen={showDatePicker}
            onOpen={() => setShowDatePicker(true)}
            onClose={() => setShowDatePicker(false)}
            onDateChange={handleDateChange}
          />

          <div className='relative flex items-center gap-2'>
            <TaskPriority
              priority={priority}
              isEditing={showPrioritySelect}
              onStartEdit={() => setShowPrioritySelect(true)}
              onSave={handlePriorityChange}
            />
          </div>
        </div>
      </div>

      {task.id && <TaskDeleteButton taskTitle={task.title} onRemove={() => onRemove(task.id!)} />}
    </motion.div>
  );
};

export default TaskItem;
