'use client';

import useMediaQuery from '@/hooks/useMediaQuery';

import type { Goal, Task } from '@/types';

import Header from '../Header/Header';

interface GoalHeaderProps {
  goal: Goal | null;
  tasks: Task[];
}

const GoalHeader = ({ goal, tasks }: GoalHeaderProps) => {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const goalTasks = goal ? tasks.filter((task) => task.goalId === goal.id) : [];

  return (
    <Header.Provider tasks={goalTasks}>
      <Header className='mb-3'>
        <Header.Content />
      </Header>
    </Header.Provider>
  );
};

export default GoalHeader;
