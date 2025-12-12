'use client';

import { TaskSchedule } from '../../types';
import TaskFab from './TaskFab/TaskFab';
import TaskPanel from './TaskPanel/TaskPanel';

interface TaskListProps {
  tasks: TaskSchedule[];
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onUpdateTaskContent: (taskId: string, newContent: string) => void;
  onUpdateTaskDate: (taskId: string, newDate: string) => void;
  onUpdateTaskPriority: (taskId: string, priority: '낮음' | '보통' | '중요') => void;
  onRemoveTask: (taskId: string) => void;
  onCreateTasks: () => void;
}

const TaskList = ({
  tasks,
  isOpen,
  onClose,
  onToggle,
  onUpdateTaskContent,
  onUpdateTaskDate,
  onUpdateTaskPriority,
  onRemoveTask,
  onCreateTasks,
}: TaskListProps) => {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <>
      <TaskFab taskCount={tasks.length} onClick={onToggle} />
      <TaskPanel
        tasks={tasks}
        isOpen={isOpen}
        onClose={onClose}
        onUpdateTaskContent={onUpdateTaskContent}
        onUpdateTaskDate={onUpdateTaskDate}
        onUpdateTaskPriority={onUpdateTaskPriority}
        onRemoveTask={onRemoveTask}
        onCreateTasks={onCreateTasks}
      />
    </>
  );
};

export default TaskList;
