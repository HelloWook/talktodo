'use client';

import Image from 'next/image';
import { createContext, useContext } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';
import { Task } from '@/types';
import { cn } from '@/utils/cn';
import { getTodoStats } from '@/utils/taskStats';

import Typography from '../Typography/Typography';
import { Progress } from '../ui/progress';

type HeaderContextProps = {
  tasks: Task[];
  stats: ReturnType<typeof getTodoStats>;
  isTablet: boolean;
  isMobile: boolean;
};

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('Header 컴포넌트는 Header.Provider 내부에서 사용되어야 합니다.');
  }
  return context;
};

interface HeaderProviderProps {
  tasks: Task[];
  children: React.ReactNode;
}

const HeaderProvider = ({ tasks, children }: HeaderProviderProps) => {
  const stats = getTodoStats(tasks);
  const isTablet = useMediaQuery('(max-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 480px)');

  return <HeaderContext.Provider value={{ tasks, stats, isTablet, isMobile }}>{children}</HeaderContext.Provider>;
};

type CommonProps = {
  className?: string;
};

interface HeaderProps extends CommonProps {
  children: React.ReactNode;
}

const Header = ({ children, className }: HeaderProps) => {
  return <header className={cn('mx-auto flex w-full flex-col items-start rounded-[40px] bg-purple-500 p-6', className)}>{children}</header>;
};

const Title = ({ className }: CommonProps) => {
  const { stats } = useHeaderContext();
  const totalTodo = stats.total;
  const isCompleted = stats.isCompleted;
  const { isTablet, isMobile } = useHeaderContext();
  return (
    <Typography as='p' variant={isMobile ? 'title3-bold' : 'title2-bold'} className={cn('text-purple-300 md:text-lg', className)}>
      {!isMobile && '오늘 '}
      {!isMobile && <br />}
      {isCompleted ? (
        <Typography as='span' variant={isMobile ? 'title3-bold' : 'title2-bold'} className='text-white md:text-lg line-clamp-1'>
          {'할 일을 모두 완료했어요!'}
        </Typography>
      ) : (
        <>
          <Typography as='span' variant={isMobile ? 'title3-bold' : 'title2-bold'} className='text-white md:text-lg line-clamp-1'>
            총 {totalTodo}건
          </Typography>

          <Typography as='span' variant={isMobile ? 'title3-bold' : 'title2-bold'} className='md:text-lg line-clamp-1'>
            의 할 일이 있어요
          </Typography>
        </>
      )}
    </Typography>
  );
};

const TodoStats = ({ className }: CommonProps) => {
  const { stats } = useHeaderContext();
  const { total: totalTodo, completed: completedTodo, incomplete: incompleteTodo } = stats;
  const { isMobile } = useHeaderContext();
  const todoItems = [
    { value: totalTodo, label: '총 일정' },
    { value: incompleteTodo, label: '미완료' },
    { value: completedTodo, label: '완료' },
  ];

  return (
    <div className={cn('flex items-center gap-5', className)}>
      {todoItems.map((item) => (
        <div key={item.label} className='flex flex-col items-center gap-1'>
          <Typography as='span' variant={isMobile ? 'title3-bold' : 'title2-bold'} className='text-center text-white md:text-lg'>
            {item.value}
          </Typography>
          {item.label && (
            <Typography as='span' variant={isMobile ? 'body3-medium-loose' : 'body2-medium-loose'} className='text-purple-200 md:text-sm'>
              {item.label}
            </Typography>
          )}
        </div>
      ))}
    </div>
  );
};

const Character = ({ className }: CommonProps) => {
  const { stats } = useHeaderContext();
  const isCompleted = stats.isCompleted;
  const imageUrl = isCompleted ? '/img/CompletedCharacter.png' : '/img/UnCompletedCharacter.png';
  return (
    <div className={cn('relative flex items-end justify-end overflow-hidden', className)}>
      <Image src={imageUrl} width={180} height={166} alt='character' />
    </div>
  );
};

const ProgressBar = ({ className }: CommonProps) => {
  const { stats } = useHeaderContext();
  const percent = stats.percent;

  return (
    <div className='flex flex-col gap-2'>
      <Typography as='p' variant='body2-medium-loose' className='text-purple-200 md:text-sm'>
        <Typography as='span' variant='body2-medium-loose' className='text-purple-203 mr-3 md:text-sm'>
          오늘의 진행률
        </Typography>
        <Typography as='span' variant='body2-medium-loose' className='text-white md:text-sm'>
          {percent}%
        </Typography>
      </Typography>
      <Progress value={percent} className={cn('h-4', className)} />
    </div>
  );
};

const Content = ({ className }: CommonProps) => {
  const { isTablet } = useHeaderContext();
  return (
    <div className={cn('flex w-full flex-row items-center justify-center lg:flex-row lg:gap-11', className)}>
      <div className='relative flex flex-1 flex-col justify-between gap-3'>
        <div className='flex items-start justify-between'>
          <Title />
          {!isTablet && <TodoStats />}
        </div>
        <ProgressBar />
        {isTablet && <TodoStats />}
      </div>

      <Character className='h-[120px] w-[130px] sm:h-[166px] sm:w-[180px]' />
    </div>
  );
};

Header.Title = Title;
Header.TodoStats = TodoStats;
Header.Character = Character;
Header.ProgressBar = ProgressBar;
Header.Content = Content;
Header.Provider = HeaderProvider;

export default Header;
