import { createContext, useContext } from 'react';

import { Task } from '@/types/Task';
import { cn } from '@/utils/cn';

import { getRepeatData } from '@/utils/getRepeatData';

import ActiveIcon from '../ActiveIcon/ActiveIcon';
import Dot from '../Dot/Dot';
import Icon from '../Icon/Icon';
import Typography from '../Typography/Typography';

type CardContextProps = {
  task: Task;
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
  onToggleDone: (taskId: string) => void;
  onOpenMemo: (taskId: string) => void;
  children: React.ReactNode;
}

const CardProvider = ({ task, onToggleDone, onOpenMemo, children }: CardProviderProps) => {
  return <CardContext.Provider value={{ task, onToggleDone, onOpenMemo }}>{children}</CardContext.Provider>;
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ className, children }: CardProps) => {
  const { task } = useCardContext();

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-lg border border-transparent p-4 shadow hover:border hover:border-purple-300',
        task.isDone ? 'bg-purple-200' : 'bg-white',
        className,
      )}
    >
      {children}
    </div>
  );
};

interface CardTitleProps {
  className?: string;
}

const CardTitle = ({ className }: CardTitleProps) => {
  const { task } = useCardContext();

  return (
    <Typography variant='body2-medium-tight' className={cn(task.isDone ? 'text-gray-400 line-through' : 'text-gray-900', className)}>
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
    <div className={cn('flex w-full items-center gap-2 text-ellipsis whitespace-nowrap', className)}>
      <Typography variant='caption-medium' className={cn('flex items-center gap-1', TEXT_COLOR_MAP[task.priority])}>
        <Dot priority={task.priority} />
        {task.priority}
      </Typography>
      <Typography variant='caption-medium' className='text-gray-400'>
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
      <button onClick={handleOpenMemo} className='cursor-pointer'>
        <Icon name='memo' className='fill-white' />
      </button>
      <button onClick={handleToggleDone} className='cursor-pointer'>
        <ActiveIcon active={task.isDone} />
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
