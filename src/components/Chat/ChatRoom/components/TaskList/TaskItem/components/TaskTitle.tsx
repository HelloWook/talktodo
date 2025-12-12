interface TaskTitleProps {
  title: string;
  isEditing: boolean;
  onStartEdit: () => void;
  onSave: (newContent: string) => void;
  onCancel: () => void;
}

const TaskTitle = ({ title, isEditing, onStartEdit, onSave, onCancel }: TaskTitleProps) => {
  if (isEditing) {
    return (
      <input
        type='text'
        defaultValue={title}
        onBlur={(e) => onSave(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur();
          } else if (e.key === 'Escape') {
            onCancel();
          }
        }}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        className='rounded border border-purple-300 px-2 py-1 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none'
      />
    );
  }

  return (
    <button onClick={onStartEdit} className='text-left text-sm font-medium text-gray-900 transition-colors hover:text-purple-600'>
      {title}
    </button>
  );
};

export default TaskTitle;
