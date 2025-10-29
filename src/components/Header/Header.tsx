'use client';

import Image from 'next/image';
import { createContext, useContext } from 'react';

import { Task } from '@/types/Task';

import { Progress } from '../ui/progress';

type HeaderContextProps = {
  tasks: Task[];
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
  return <HeaderContext.Provider value={{ tasks }}>{children}</HeaderContext.Provider>;
};

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className='mx-auto flex w-full flex-col items-start rounded-[40px] bg-purple-500 px-6 py-6 sm:px-8 sm:py-6 lg:w-[100%] lg:max-w-[1168px] lg:px-11 lg:pt-7 lg:pb-9'>
      {children}
    </header>
  );
};

interface TitleProps {
  className?: string;
}

const Title = ({ className }: TitleProps) => {
  const { tasks } = useHeaderContext();
  const totalTodo = tasks.length;
  const completedTodo = tasks.filter((task) => task.isDone).length;
  const percent = totalTodo > 0 ? Math.round((completedTodo / totalTodo) * 100) : 0;
  const isCompleted = percent === 100;

  return (
    <p className={`font-title3-bold sm:font-title2-bold lg:font-title1-bold text-purple-300 ${className || ''}`}>
      오늘
      <br />
      {isCompleted ? (
        <span className='font-title3-bold sm:font-title2-bold lg:font-title1-bold text-white'>할 일을 모두 완료했어요!</span>
      ) : (
        <>
          <span className='font-title3-bold sm:font-title2-bold lg:font-title1-bold text-white'>총 {totalTodo}건</span>
          <span>의 할 일이 있어요</span>
        </>
      )}
    </p>
  );
};

interface TodoStatsProps {
  className?: string;
}

const TodoStats = ({ className }: TodoStatsProps) => {
  const { tasks } = useHeaderContext();
  const totalTodo = tasks.length;
  const completedTodo = tasks.filter((task) => task.isDone).length;
  const incompleteTodo = totalTodo - completedTodo;

  const todoItems = [
    { value: totalTodo, label: '총 일정' },
    { value: incompleteTodo, label: '미완료' },
    { value: completedTodo, label: '완료' },
  ];

  return (
    <div className={`flex items-center gap-5 ${className || ''}`}>
      {todoItems.map((item) => (
        <div key={item.label} className='flex flex-col items-center gap-1'>
          <div className='font-count text-center text-white'>{item.value}</div>
          <div className='font-body2-medium text-base text-purple-200'>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

interface CharacterProps {
  className?: string;
}

const Character = ({ className }: CharacterProps) => {
  return (
    <div className={`relative flex items-end justify-end overflow-hidden ${className || ''}`}>
      <Image src='/img/InCompletedCharacter.png' width={180} height={166} alt='character' />
    </div>
  );
};

interface ProgressBarProps {
  className?: string;
}

const ProgressBar = ({ className }: ProgressBarProps) => {
  const { tasks } = useHeaderContext();
  const totalTodo = tasks.length;
  const completedTodo = tasks.filter((task) => task.isDone).length;
  const percent = totalTodo > 0 ? Math.round((completedTodo / totalTodo) * 100) : 0;

  return <Progress value={percent} className={`h-4 ${className || ''}`} />;
};

interface ContentProps {
  className?: string;
}

const Content = ({ className }: ContentProps) => {
  return (
    <div className={`flex w-full flex-row lg:flex-row lg:gap-11 ${className || ''}`}>
      {/* 왼쪽 영역 */}
      <div className='relative flex flex-1 flex-col gap-3'>
        <div className='flex items-start justify-between'>
          <Title />
          <TodoStats />
        </div>
        <ProgressBar />
      </div>

      {/* 캐릭터 이미지 영역 */}
      <Character />
    </div>
  );
};

// 컴파운드 패턴 적용
Header.Title = Title;
Header.TodoStats = TodoStats;
Header.Character = Character;
Header.ProgressBar = ProgressBar;
Header.Content = Content;
Header.Provider = HeaderProvider;

export default Header;
