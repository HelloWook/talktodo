import { createContext, useContext } from 'react';

import type { LayoutType } from '@/components/TaskViewContainer/TaskViewContainer.types';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Task } from '@/types';
import { cn } from '@/utils/cn';

import { getRepeatData } from '@/utils/getRepeatData';

import Dot from '../Dot/Dot';
import Icon from '../Icon/Icon';
import Typography from '../Typography/Typography';

type CardContextProps = {
  task: Task;
  layout: LayoutType;
  onToggleDone: (taskId: string) => void;
  onOpenMemo: (taskId: string) => void;
};

const CardContext = createContext<CardContextProps | undefined>(undefined);

const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('Card 컴포넌트는 Card.Provider 내부에서 사용되어야 합니다.');
  }
  return context;
};

interface CardProviderProps {
  task: Task;
  layout: LayoutType;
  onToggleDone: (taskId: string) => void;
  onOpenMemo: (taskId: string) => void;
  children: React.ReactNode;
}

const CardProvider = ({ task, layout, onToggleDone, onOpenMemo, children }: CardProviderProps) => {
  return <CardContext.Provider value={{ task, layout, onToggleDone, onOpenMemo }}>{children}</CardContext.Provider>;
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  handleClick: () => void;
}

const Card = ({ className, children, handleClick }: CardProps) => {
  const { task, layout } = useCardContext();

  const isListView = layout === 'list';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div onClick={handleClick} onKeyDown={handleKeyDown} role='button' tabIndex={0} className={cn('w-full cursor-pointer text-left')}>
      <article
        className={cn(
          'flex rounded-lg border border-transparent shadow hover:border hover:border-purple-300',
          isListView ? 'h-[80px] flex-row items-center gap-4 p-4 sm:h-[90px]' : 'min-h-[140px] flex-col gap-1.5 p-3 sm:min-h-[160px]',
          task.isDone ? 'bg-purple-200' : 'bg-white',
          className,
        )}
        aria-label={`작업: ${task.title}`}
      >
        {children}
      </article>
    </div>
  );
};

interface CardTitleProps {
  className?: string;
}

const CardTitle = ({ className }: CardTitleProps) => {
  const { task } = useCardContext();

  const isMobile = useMediaQuery('(max-width: 640px)');
  return (
    <Typography
      variant={isMobile ? 'body3-medium-tight' : 'body2-medium-tight'}
      className={cn(task.isDone ? 'text-gray-400 line-through' : 'text-gray-900', className)}
    >
      {task.title}
    </Typography>
  );
};

interface CardDescriptionProps {
  className?: string;
}

const CardDescription = ({ className }: CardDescriptionProps) => {
  const { task } = useCardContext();

  return (
    <Typography variant='caption-medium' className={cn('text-gray-400', className)}>
      {task.description}
    </Typography>
  );
};

interface CardDataProps {
  className?: string;
}

const TEXT_COLOR_MAP = {
  낮음: 'text-green-500',
  보통: 'text-yellow-500',
  중요: 'text-red-500',
};

const CardData = ({ className }: CardDataProps) => {
  const { task } = useCardContext();

  return (
    <div className={cn('flex w-full items-center gap-2', className)}>
      <Typography variant='caption-medium' className={cn('flex items-center gap-1 whitespace-nowrap', TEXT_COLOR_MAP[task.priority])}>
        <Dot priority={task.priority} />
        {task.priority}
      </Typography>
      <Typography variant='caption-medium' className='truncate text-gray-400'>
        {getRepeatData(task.repeatDays)}
      </Typography>
    </div>
  );
};

interface CardItemProps {
  className?: string;
}

const CardItem = ({ className }: CardItemProps) => {
  const { task, onToggleDone, onOpenMemo } = useCardContext();

  const handleToggleDone = () => {
    onToggleDone(task.id);
  };

  const handleOpenMemo = () => {
    onOpenMemo(task.id);
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleOpenMemo();
        }}
        className='cursor-pointer'
        aria-label={`${task.title} 메모 열기`}
      >
        <Icon name='memo' className={cn(task.isDone ? 'fill-purple-200' : 'fill-white')} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleToggleDone();
        }}
        className='cursor-pointer'
        aria-label={`${task.title} ${task.isDone ? '완료 취소' : '완료 처리'}`}
        aria-pressed={task.isDone}
      >
        <Icon role='status' name={'active'} className={cn('text-purple-500', task.isDone ? 'fill-purple-200' : 'fill-white')} />
      </button>
    </div>
  );
};

Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Data = CardData;
Card.Item = CardItem;
Card.Provider = CardProvider;

export default Card;
