import { useState } from 'react';

import { Priority } from '@/lib/validation/task';

import { formatDateToString } from '@/utils/dateFormat';

interface UseTaskItemProps {
  taskId: string;
  onUpdateDate: (taskId: string, newDate: string) => void;
  onUpdateContent: (taskId: string, newContent: string) => void;
  onUpdatePriority: (taskId: string, priority: Priority) => void;
}

export const useTaskItem = ({ taskId, onUpdateDate, onUpdateContent, onUpdatePriority }: UseTaskItemProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPrioritySelect, setShowPrioritySelect] = useState(false);

  const handleDateChange = (date: Date) => {
    const newDateString = formatDateToString(date);
    onUpdateDate(taskId, newDateString);
    setShowDatePicker(false);
  };

  const handleContentChange = (newContent: string) => {
    if (newContent.trim()) {
      onUpdateContent(taskId, newContent.trim());
    }
    setIsEditingTitle(false);
  };

  const handlePriorityChange = (newPriority: Priority) => {
    onUpdatePriority(taskId, newPriority);
    setShowPrioritySelect(false);
  };

  return {
    isEditingTitle,
    setIsEditingTitle,
    showDatePicker,
    setShowDatePicker,
    showPrioritySelect,
    setShowPrioritySelect,
    handleDateChange,
    handleContentChange,
    handlePriorityChange,
  };
};
