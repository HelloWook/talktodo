'use client';

interface TaskFabProps {
  taskCount: number;
  onClick: () => void;
}

const TaskFab = ({ taskCount, onClick }: TaskFabProps) => {
  if (taskCount === 0) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className='fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-purple-500 shadow-lg transition-all hover:scale-110 hover:bg-purple-600 hover:shadow-xl'
      aria-label='할 일 패널 열기'
    >
      {/* 체크리스트 아이콘 */}
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      {/* 개수 뱃지 */}
      <div className='absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500'>
        <span className='text-xs font-bold text-white'>{taskCount}</span>
      </div>
    </button>
  );
};

export default TaskFab;

