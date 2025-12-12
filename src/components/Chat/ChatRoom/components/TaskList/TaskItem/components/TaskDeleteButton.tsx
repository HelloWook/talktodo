interface TaskDeleteButtonProps {
  taskTitle: string;
  onRemove: () => void;
}

const TaskDeleteButton = ({ taskTitle, onRemove }: TaskDeleteButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      className='flex-shrink-0 rounded-lg p-1.5 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50'
      aria-label={`${taskTitle} 삭제`}
    >
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M12 4L4 12M4 4L12 12' stroke='#ef4444' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    </button>
  );
};

export default TaskDeleteButton;
